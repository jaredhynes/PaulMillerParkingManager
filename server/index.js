const express = require("express");
const app = express();

const cors = require("cors");
const mysql = require("mysql");

app.use(cors());
app.use(express.json());

const db = mysql.createPool({
    host: 'soccerdb.calingaiy4id.us-east-2.rds.amazonaws.com',
    user: 'parkinguser',
    password: 'Ydjgf35jaskjh92',
    database: 'parking',
});

app.get("/", (req, res) => {
    res.send("hello");
});

app.get("/insertNewCar", (req, res) => {
    const vin = req.body.vin;
    const make_model = req.body.make_model;
    const stockNum = req.body.stockNum;
    const year = req.body.year;
    const spot_id = req.spot_id;

    db.query(
        "INSERT INTO cars (vin, stockNum, make_model, year, spot_id) VALUES (?,?,?,?,?)",
        [vin, stockNum, make_model, year, spot_id],
        (err, result) => {
            if (err) {
                console.log(err);
            }
            else{
                res.send("Values Inserted");
            }
        }
    );
})

app.get("/availableSpots", (req, res) => {
    db.query("select ps.spot_id, ps.spot_name from parking_spots ps left join cars c on ps.spot_id = c.spot_id where c.spot_id is null order by ps.spot_name", (err, result) => {
        if(err){
            console.log("error: ");
            console.log(err);
        }
        else{
            res.send(result);
        }
    })
})

app.get("/editCar", (req, res) => {
    const id = req.body.id;
    const vin = req.body.vin;
    const make_model = req.body.make_model;
    const stockNum = req.body.stockNum;
    const year = req.body.year;
})

app.get("/cars", (req, res) => {
    db.query("select c.car_id, c.vin, c.stockNum, c.make_model, c.year, ps.spot_name from cars c, parking_spots ps where c.spot_id = ps.spot_id order by spot_name" , (err, result) => {
        if (err) {
            console.log("error: ");
            console.log(err);
        }
        else{
            res.send(result);
        }
    })
})

app.listen(8001, () => {
    console.log("running on port 8001");
});