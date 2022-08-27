const express = require(`express`);
const app = express();
const { auth, requiredScopes } = require("express-oauth2-jwt-bearer");

// Authorization middleware. When used, the Access Token must
// exist and be verified against the Auth0 JSON Web Key Set.
const checkJwt = auth({
	audience: "https://quickstarts/api",
	issuerBaseURL: `https://dev-w1z8wy-p.us.auth0.com/`,
});

const checkUpdateCars = requiredScopes(`update:cars`);
const checkDeleteCars = requiredScopes(`delete:cars`);
const checkReadEdits = requiredScopes(`read:edits`);


const cors = require("cors")

const { Client } = require("pg")

const PORT = process.env.PORT || 8001

require(`dotenv`).config();

app.use(cors());
app.use(express.json());

const db = new Client({
	connectionString: process.env.DATABASE_URL,
	ssl: {
		rejectUnauthorized: false
	}
});

db.connect();

app.put(`/update`, checkJwt, checkUpdateCars, (req, res) => {
	const vin = req.body.vin;
	const spot_id = req.body.spot_id;
	db.query(`UPDATE parking.cars SET "spot_id" = ${spot_id} where "vin" = '${vin}'`,
		(err, result) => {
			if (err) {
				console.log(`In update: `, err);
			}
			else {
				res.send(result);
			}
		});
});

app.put(`/updateInfo`, checkJwt, checkUpdateCars, (req, res) => {
	const vin = req.body.vin;
	const stockNum = req.body.stockNum;
	const makeModel = req.body.makeModel;
	const year = req.body.year;
	const commNum = req.body.commNum;
	const exteriorColor = req.body.exteriorColor;
	const interiorColor = req.body.interiorColor;
	const msrp = req.body.msrp;

	if (/^[A-Za-z0-9 ]*$/.test(makeModel) && /^[0-9]*$/.test(year) && /^[A-Za-z0-9]*$/.test(stockNum)) {
		db.query(`UPDATE parking.cars SET "stockNum" = '${stockNum}', "make_model" = '${makeModel}', "year" = '${year}', "commNum" = '${commNum}', "exteriorColor" = '${exteriorColor}', "interiorColor" = '${interiorColor}', "msrp" = '${msrp}' where "vin" = '${vin}'`,
			(err, result) => {
				if (err) {
					console.log(`In updateInfo: `, err);
				}
				else {
					res.send(result);
				}
			});
	}
});

app.put(`/changeStatus`, checkJwt, checkUpdateCars, (req, res) => {
	const vin = req.body.vin;
	const status = req.body.status;
	db.query(`UPDATE parking.cars SET "status" = '${status}' where "vin" = '${vin}'`,
		(err, result) => {
			if (err) {
				console.log(`In changeStatus: `, err);
			}
			else {
				res.send(result)
			}
		});
})


app.put(`/updateDescription`, checkJwt, checkUpdateCars, (req, res) => {
	const vin = req.body.vin;
	const des = req.body.description;
	db.query(`UPDATE parking.cars SET "description" = '${des}' where "vin" = '${vin}'`,
		(err, result) => {
			if (err) {
				console.log(`In updateDescription: `, err);
			}
			else {
				res.send(result)
			}
		});
});

app.delete(`/deleteEventByVin/:vin`, checkJwt, checkDeleteCars, (req, res) => {
	const vin = req.params.vin;
	db.query(`DELETE FROM parking.history WHERE "car_id" = '${vin}'`,
		(err, result) => {
			if (err) {
				console.log(`In deleteEventByVin: `, err);
			}
			else {
				res.send(result);
			}
		})
})

app.delete(`/delete/:vin`, checkJwt, checkDeleteCars, (req, res) => {
	const vin = req.params.vin;
	db.query(`DELETE FROM parking.cars WHERE "vin" = '${vin}'`,
		(err, result) => {
			if (err) {
				console.log(`In delete: `, err);
			}
			else {
				res.send(result);
			}
		})
})

app.put(`/archive`, checkJwt, checkDeleteCars, (req, res) => {
	const vin = req.body.vin;
	const archived = req.body.archived
	const spot_id = req.body.spot_id;
	db.query(`UPDATE parking.cars SET "archived" = ${archived}, "spot_id" = ${spot_id} WHERE "vin" = '${vin}'`,
		(err, result) => {
			if (err) {
				console.log(`In archive: `, err);
			}
			else {
				res.send(result);
			}
		})
})

app.post(`/insertNewCar`, checkJwt, checkUpdateCars, (req, res) => {
	const vin = req.body.vin;
	const make_model = req.body.make_model;
	const stockNum = req.body.stockNum;
	const year = req.body.year;
	const spot_id = req.body.spot_id;
	const commNum = req.body.commNum;
	const exteriorColor = req.body.exteriorColor;
	const interiorColor = req.body.interiorColor;
	const msrp = req.body.msrp;

	if (validateVin(vin) && /^[A-Za-z0-9 ]*$/.test(make_model) && /^[0-9]*$/.test(year) && /^[A-Za-z0-9]*$/.test(stockNum)) {
		db.query(`INSERT INTO parking.cars ("vin", "stockNum", "make_model", "year", "spot_id", "commNum", "exteriorColor", "interiorColor", "msrp") VALUES ('${vin}','${stockNum}','${make_model}','${year}','${spot_id}', '${commNum}', '${exteriorColor}', '${interiorColor}', '${msrp}')`,
			(err, result) => {
				if (err) {
					console.log(`In insertNewCar1: `, err);
				}
				else {
					res.send(result);
				}
			});
	}
})

app.post(`/insertEvent`, checkJwt, checkUpdateCars, (req, res) => {
	const carID = req.body.car_id || null;
	const old_make_model = req.body.old_make_model || null;
	const new_make_model = req.body.new_make_model || null;
	const old_year = req.body.old_year || null;
	const new_year = req.body.new_year || null; 
	const old_stock_num = req.body.old_stock_num || null;
	const new_stock_num = req.body.new_stock_num || null;
	const old_location = req.body.old_location || null;
	const new_location = req.body.new_location || null;
	const old_comm_num = req.body.old_comm_num || null; 
	const new_comm_num = req.body.new_comm_num || null;
	const old_ext_color = req.body.old_ext_color || null;
	const new_ext_color = req.body.new_ext_color || null;
	const old_int_color = req.body.old_int_color || null;
	const new_int_color = req.body.new_int_color || null;
	const old_msrp = req.body.old_msrp || null;
	const new_msrp = req.body.new_msrp || null;
	const user_id = req.body.user_id || null;
	const event_type = req.body.event_type; 
	const event_date = req.body.event_date;
	const archived = req.body.archived || 0;
	const archive_description = req.body.archive_description || "";

	db.query(`INSERT INTO parking.history ("car_id", "user_id", "event_type", "event_date", "old_make_model", "new_make_model", "old_year", "new_year", "old_stock_num", "new_stock_num", "old_location", "new_location", "old_comm_num", "new_comm_num", "old_ext_color", "new_ext_color", "old_int_color", "new_int_color", "old_msrp", "new_msrp", "archived", "archive_description") 
	VALUES ('${carID}','${user_id}','${event_type}','${event_date}','${old_make_model}','${new_make_model}','${old_year}','${new_year}','${old_stock_num}','${new_stock_num}','${old_location}','${new_location}', '${old_comm_num}','${new_comm_num}','${old_ext_color}','${new_ext_color}','${old_int_color}','${new_int_color}','${old_msrp}','${new_msrp}', ${archived}, '${archive_description}')`, (err, result) => {
		if (err) {
			console.log(`In insertEvent: `, err);
		}
		else {
			res.send(result);
		}
	});
})

app.get(`/getHistory`, checkJwt, checkReadEdits, (req, res) => {
	db.query(`select * from parking.history`,
		(err, result) => {
			if (err) {
				console.log(`In getHistory: `, err);
			}
			else {
				res.send(result);
			}
		});
})

app.get(`/availableSpots`, checkJwt, (req, res) => {
	db.query(`select ps."spot_id", ps."spot_name" from parking.parking_spots ps left join parking.cars c on ps."spot_id" = c."spot_id" where c."spot_id" is null order by ps."spot_name"`,
		(err, result) => {
			if (err) {
				console.log(`In availableSpots: `, err);
			}
			else {
				res.send(result);
			}
		})
})

app.get(`/cars`, checkJwt, (req, res) => {
	db.query(`select c."vin", c."stockNum", c."make_model", c."year", c."description", c."archived", COALESCE(c.status, 'blank') "status", c."commNum", c."exteriorColor", c."interiorColor", c."msrp", ps."spot_name", ps."spot_id", ps."x_val", ps."y_val" from parking.cars c, parking.parking_spots ps where c."spot_id" = ps."spot_id" order by "spot_name"`,
		(err, result) => {
			if (err) {
				console.log(`In cars: `, err);
			}
			else {
				res.send(result);
			}
		})
})

app.get(`/getAllSpots`, checkJwt, (req, res) => {
	db.query(`select ps."spot_id", ps."spot_name" from parking.parking_spots ps`,
		(err, result) => {
			if (err) {
				console.log(`In getAllSpots: `, err);
			}
			else {
				res.send(result);
			}
		})
})



function validateVin(vin) {
	return validate(vin);
}

function transliterate(c) {
	return "0123456789.ABCDEFGH..JKLMN.P.R..STUVWXYZ".indexOf(c) % 10;
}

//eslint-disable-next-line
function get_check_digit(vin) {
	var map = "0123456789X";
	var weights = "8765432X098765432";
	var sum = 0;
	for (var i = 0; i < 17; ++i)
		sum += transliterate(vin[i]) * map.indexOf(weights[i]);
	return map[sum % 11];
}

function validate(vin) {
	if (vin.length !== 17) return false;
	return get_check_digit(vin) === vin[8];
}

app.listen(PORT, () => {
	console.log(`running on port ${PORT}`);
});