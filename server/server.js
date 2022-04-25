const express = require("express");
const app = express();
const { auth, requiredScopes } = require('express-oauth2-jwt-bearer');

// Authorization middleware. When used, the Access Token must
// exist and be verified against the Auth0 JSON Web Key Set.
const checkJwt = auth({
  audience: 'https://quickstarts/api',
  issuerBaseURL: `https://dev-w1z8wy-p.us.auth0.com/`,
});
const checkScopes = requiredScopes("update:current_user_metadata");

const cors = require('cors')
const mysql = require("mysql");

const PORT = process.env.PORT || 8001

require("dotenv").config();

app.use(cors());
app.use(express.json());

const db = mysql.createPool({
	host: process.env.DB_HOST,
	user: 'parkingusr',
	password: process.env.DB_PASS,
	database: 'parking',
});

app.put("/update", checkJwt, (req, res) =>{
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

app.put("/updateInfo", checkJwt, (req, res) =>{
	const vin = req.body.vin;
	const stockNum = req.body.stockNum;
	const makeModel = req.body.makeModel;
	const year = req.body.year;

	db.query(
		"UPDATE cars SET stockNum = ?, make_model = ?, year = ? where vin = ?",
		[stockNum, makeModel, year, vin],
		(err, result) => {
			if (err){
				console.log("Error in updateInfo:")
				console.log(err);
			}
			else{
				res.send(result);
			}
		}
	);
});

app.put("/updateDescription", checkJwt, (req,res) =>{
	const vin = req.body.vin;
	const des = req.body.description;
	db.query(
		"UPDATE cars SET description = ? where vin = ?",
		[des, vin],
		(err, result) =>{
			if(err){
				console.log("Error in updateDescription:")
				console.log(err);
			}
			else{
				res.send(result)
			}
		}
	);
});

app.delete("/deleteEventByVin/:vin", checkJwt, (req,res) => {
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

app.delete("/delete/:vin", checkJwt, (req, res) => {
	const vin = req.params.vin;
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

app.post("/insertNewCar", checkJwt, (req, res) => {
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

app.post("/insertEvent", checkJwt, (req, res) => {
	const carID = req.body.car_id;
	const event_description = req.body.description;
	const user_id = req.body.user_id;
	const event_type = req.body.event_type;
	const event_date = req.body.event_date;

	db.query(
		"INSERT INTO history (car_id, user_id, event_type, event_date, event_description) VALUES (?,?,?,?,?)",
		[carID, user_id, event_type, event_date, event_description],
		(err, result) => {
			if(err){
				console.log(err);
			}
			else{
				res.send("Values Inserted");
			}
	});
})

app.get("/getHistory", checkJwt, (req, res) => {
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

app.get("/availableSpots", checkJwt, (req, res) => {
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

app.get("/cars", checkJwt, (req, res) => {
	db.query("select c.vin, c.stockNum, c.make_model, c.year, c.description, ps.spot_name, ps.spot_id, ps.x_val, ps.y_val from cars c, parking_spots ps where c.spot_id = ps.spot_id order by spot_name", (err, result) => {
		if (err) {
			console.log("error: ");
			console.log(err);
		}
		else {
			res.send(result);
		}
	})
})

app.get("/getAllSpots", checkJwt, (req, res) => {
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

app.listen(PORT, () => {
	console.log(`running on port ${PORT}`);
});