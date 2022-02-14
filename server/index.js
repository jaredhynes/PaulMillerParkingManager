const express = require("express");
const app = express();

const mysql = require("mysql");

const db = mysql.createPool({
    host: 'soccerdb.calingaiy4id.us-east-2.rds.amazonaws.com',
    user: 'parkinguser',
    password: 'Ydjgf35jaskjh92',
    database: 'parking',
});

app.get("/", (req, res) => {

    const sqlGet = "select * from cars"
    db.query(sqlGet, (err, result) => {
        res.send(result);
    })
});

app.listen(8000, () => {
    console.log("running on port 8000");
});