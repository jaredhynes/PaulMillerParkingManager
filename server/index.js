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

app.put("/update", (req, res) =>{
	const vin = req.body.vin;
	const spot_id = req.body.spot_id;
	db.query(
		"UPDATE cars SET spot_id = ? where vin = ?",
		[spot_id, vin],
		(err, result) => {
			if (err){
				console.log("Error in Update:")
				console.log(err);
			}
			else{
				res.send(result);
			}
		}
	);
});

app.delete("/deleteEventByVin/:vin", (req,res) => {
	const vin = req.params.vin;
	db.query("DELETE FROM history WHERE car_id = ? ", vin, (err, result) => {
		if(err) {
			console.log("Error in delete:");
			console.log(err);
		}
		else{
			res.send(result);
		}
	})
})

app.delete("/delete/:vin", (req, res) => {
	console.log(req.params);
	const vin = req.params.vin;
	console.log("vin:")
	console.log(vin);
	db.query("DELETE FROM cars WHERE vin = ?", vin, (err, result) => {
		if(err) {
			console.log("Error in delete:");
			console.log(err);
		}
		else{
			res.send(result);
		}
	})
})

app.post("/insertNewCar", (req, res) => {
	const vin = req.body.vin;
	const make_model = req.body.make_model;
	const stockNum = req.body.stockNum;
	const year = req.body.year;
	const spot_id = req.body.spot_id;

	db.query(
		"INSERT INTO cars (vin, stockNum, make_model, year, spot_id) VALUES (?,?,?,?,?)",
		[vin, stockNum, make_model, year, spot_id],
		(err, result) => {
			if (err) {
				console.log(err);
			}
			else {
				res.send("Values Inserted");
			}
		}
	);
})

app.post("/insertEvent", (req, res) => {
	const carID = req.body.car_id;
	const old_spot_id = req.body.old_spot_id;
	const new_spot_id = req.body.new_spot_id;
	const user_id = req.body.user_id;
	const event_type = req.body.event_type;
	const event_date = req.body.event_date;

	db.query(
		"INSERT INTO history (car_id, old_spot_id, new_spot_id, user_id, event_type, event_date) VALUES (?,?,?,?,?,?)",
		[carID, old_spot_id, new_spot_id, user_id, event_type, event_date],
		(err, result) => {
			if(err){
				console.log(err);
			}
			else{
				res.send("Values Inserted");
			}
	});
})

app.get("/getHistory", (req, res) => {
	db.query("select * from history", (err, result) => {
		if (err){
			console.log("error at getHistory: ");
			console.log(err);
		}
		else{
			res.send(result);
		}
	});
})


app.get("/availableSpots", (req, res) => {
	db.query("select ps.spot_id, ps.spot_name from parking_spots ps left join cars c on ps.spot_id = c.spot_id where c.spot_id is null order by ps.spot_name", (err, result) => {
		if (err) {
			console.log("error: ");
			console.log(err);
		}
		else {
			res.send(result);
		}
	})
})

app.get("/cars", (req, res) => {
	db.query("select c.vin, c.stockNum, c.make_model, c.year, ps.spot_name from cars c, parking_spots ps where c.spot_id = ps.spot_id order by spot_name", (err, result) => {
		if (err) {
			console.log("error: ");
			console.log(err);
		}
		else {
			res.send(result);
		}
	})
})

app.get("/getAllSpots", (req, res) => {
	db.query("select ps.spot_id, ps.spot_name from parking_spots ps", (err, result) => {
		if(err) {
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