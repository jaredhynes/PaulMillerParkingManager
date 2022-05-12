const express = require(`express`);
const app = express();
const { auth, requiredScopes } = require("express-oauth2-jwt-bearer");

// Authorization middleware. When used, the Access Token must
// exist and be verified against the Auth0 JSON Web Key Set.
const checkJwt = auth({
	audience: "https://quickstarts/api",
	issuerBaseURL: `https://dev-w1z8wy-p.us.auth0.com/`,
});
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

app.put(`/update`, checkJwt, (req, res) => {
	const vin = req.body.vin;
	const spot_id = req.body.spot_id;
	db.query(`UPDATE parking.cars SET "spot_id" = '${spot_id}' where "vin" = '${vin}'`, 
		(err, result) => {
			if (err) {
				console.log(`In update: `, err);
			}
			else {
				res.send(result);
			}
	});
});

app.put(`/updateInfo`, checkJwt, (req, res) => {
	const vin = req.body.vin;
	const stockNum = req.body.stockNum;
	const makeModel = req.body.makeModel;
	const year = req.body.year;

	if (/^[A-Za-z0-9 ]*$/.test(makeModel) && /^[0-9]*$/.test(year) && /^[A-Za-z0-9]*$/.test(stockNum)) {
		db.query(`UPDATE parking.cars SET "stockNum" = '${stockNum}', "make_model" = '${makeModel}', "year" = '${year}' where "vin" = '${vin}'`,
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

app.put(`/updateDescription`, checkJwt, (req, res) => {
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
	db.query(`UPDATE parking.cars SET "archived" = '${archived}' WHERE "vin" = '${vin}'`, 
	(err, result) => {
		if (err) {
			console.log(`In archive: `, err);
		}
		else {
			res.send(result);
		}
	})
})

app.post(`/insertNewCar`, checkJwt, (req, res) => {
	const vin = req.body.vin;
	const make_model = req.body.make_model;
	const stockNum = req.body.stockNum;
	const year = req.body.year;
	const spot_id = req.body.spot_id;

	if (validateVin(vin) && /^[A-Za-z0-9 ]*$/.test(make_model) && /^[0-9]*$/.test(year) && /^[A-Za-z0-9]*$/.test(stockNum)) {
		db.query(`INSERT INTO parking.cars ("vin", "stockNum", "make_model", "year", "spot_id") VALUES ('${vin}','${stockNum}','${make_model}','${year}','${spot_id}')`,
		(err, result) => {
			if (err) {
				console.log(`In insertNewCar: `, err);
			}
			else {
				res.send(result);
			}
		});
	}
})

app.post(`/insertEvent`, checkJwt, (req, res) => {
	const carID = req.body.car_id;
	const old_make_model = req.body.old_make_model ? req.body.old_make_model : null;
	const new_make_model = req.body.new_make_model ? req.body.new_make_model : null;
	const old_year = req.body.old_year ? req.body.old_year : null;
	const new_year = req.body.new_year ? req.body.new_year : null;
	const old_stock_num = req.body.old_stock_num ? req.body.old_stock_num : null;
	const new_stock_num = req.body.new_stock_num ? req.body.new_stock_num : null;
	const old_location = req.body.old_location ? req.body.old_location : null;
	const new_location = req.body.new_location ? req.body.new_location : null;
	const user_id = req.body.user_id;
	const event_type = req.body.event_type;
	const event_date = req.body.event_date;
	const archived = req.body.archived ? req.body.archived : 0;
	const archive_description = req.body.archive_description ? req.body.archive_description : "";

	db.query(`INSERT INTO parking.history ("car_id", "user_id", "event_type", "event_date", "old_make_model", "new_make_model", "old_year", "new_year", "old_stock_num", "new_stock_num", "old_location", "new_location", "archived", "archive_description") 
	VALUES ('${carID}','${user_id}','${event_type}','${event_date}','${old_make_model}','${new_make_model}','${old_year}','${new_year}','${old_stock_num}','${new_stock_num}','${old_location}','${new_location}','${archived}', '${archive_description}')`, (err, result) => {
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
	db.query(`select c."vin", c."stockNum", c."make_model", c."year", c."description", c."archived", ps."spot_name", ps."spot_id", ps."x_val", ps."y_val" from parking.cars c, parking.parking_spots ps where c."spot_id" = ps."spot_id" order by "spot_name"`, 
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
    // if (vin.length !== 17) return false;
    //     return get_check_digit(vin) === vin[8];
    return /^[A-Z0-9]*$/.test(vin)
}

app.listen(PORT, () => {
	console.log(`running on port ${PORT}`);
});