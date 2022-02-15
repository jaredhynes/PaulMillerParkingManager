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

    db.query(
        "INSERT INTO cars (vin, stockNum, make_model, year) VALUES (?,?,?,?)",
        [vin, stockNum, make_model, year],
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

app.get("/cars", (req, res) => {
    db.query("select * from cars", (err, result) => {
        if (err) {
            console.log("error:");
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