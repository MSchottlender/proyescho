var mysql = require('mysql');
const express = require('express');
const fs = require('fs');
var path = require('path');
var httpServer = express();

//For settings file
var settingsFil = fs.readFileSync("./settings.json");

try {
	var settings = JSON.parse(settingsFil);
}
catch(e) {
	console.error("ERROR : Could not parse JSON Settings file! :"+e);
	process.exit();
}

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "micontraCOVID19",
    database: "mydb"
});
  
con.connect(function(err) {
    if (err) throw err;
    console.log("DB Connected.");
});

//HTTP Server
httpServer.use(express.static(settings.http.static));
httpServer.listen(settings.http.port);


httpServer.get('/', (req, res) => {
    // console.log('HTTP SERVER : sending status to ', req.ip);
    // console.log(__dirname + '/html/index.html');
    res.sendFile(__dirname + '/html/index.html');
});

httpServer.get('/submitData', (req, res) => {
    console.log('Data received.');
    var sql = "INSERT INTO customers (product, address, availability) VALUES ('"+ req.query.prod_submit +"', '"+ req.query.addr_submit +"','"+ req.query.avail_submit +"')";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Input sent");
    });
    res.sendFile(__dirname + '/html/index.html');
});

httpServer.get('/searchData', (req, res) => {
    console.log('Query received.');
    var sql = "SELECT availability FROM customers WHERE product = '"+ req.query.prod_input +"' AND address = '"+ req.query.addr_input +"';";
    con.query(sql, function (err, result) {
        if (err) throw err;
        if(result[0] === undefined){
            console.log('No product found');
        } else {
            let prodAvailability = result[0].availability;
            console.log("Query successful. Result = " + prodAvailability);
            res.send(prodAvailability) 
        }
    });
});

// function main() {
// console.log('DOM was created, starting connection with API');

// document.addEventListener("DOMContentLoaded", main);

// document.getElementById("enviar").addEventListener("click", function (){
//     console.log('Hola!');
//     
// });
// }