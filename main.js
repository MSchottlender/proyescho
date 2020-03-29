const mysql = require('mysql');
const { Sequelize } = require('sequelize');
const express = require('express');
const fs = require('fs');
const path = require('path');
const httpServer = express();
const bodyParser = require('body-parser');
const productsService = require('./services/products');
const addressesService = require('./services/addresses');
const reportsService = require('./services/reports');

httpServer.use(bodyParser.json())

//For settings file
const settingsFil = fs.readFileSync("./settings.json");

try {
	var settings = JSON.parse(settingsFil);
}
catch(e) {
	console.error("ERROR : Could not parse JSON Settings file! :"+e);
	process.exit();
}

const sequelize = new Sequelize('mysql://escho:micontraCOVID19:3306/mydb');

httpServer.post('/report', async (req,res) => {
    const report = await reportsService.createReport({productName: req.query.product_name,
                                                      productDescription: req.query.product_description,
                                                      placeName: req.query.place_name,
                                                      placeDescription: req.query.place_description,
                                                      fullAddress: req.query.full_address,
                                                      availability: req.query.availability,
                                                      price: req.query.price,
                                                      comment: req.query.comment});
    res.status(203).send(report);
});

httpServer.get('/report', async (req,res) => {
    const latestReport = await reportsService.getLatestReport({productName: req.query.product_name,              
                                                               placeName: req.query.place_name,
                                                               fullAddress: req.query.full_address});
    res.status(200).send(latestReport[0].dataValues);
});

httpServer.get('/productList', async (req,res) => {
    const products = await productsService.getProducts();
    res.status(200).send(products);
});

httpServer.post('/productList', async (req,res) => {

    const product = await productsService.createProduct({name: req.query.name,
                                                         description: req.query.description});
    res.status(203).send(product);
});

httpServer.get('/addressList', async (req,res) => {
    const addresses = await addressesService.getAddresses();
    res.status(200).send(addresses);
});

httpServer.post('/addressList', async (req,res) => {
    console.log(req.query)
    const address = await addressesService.createAddress({name: req.query.name,
                                                         description: req.query.description,
                                                         fullAddress: req.query.full_address});
    res.status(203).send(address);
});

//HTTP Server
httpServer.use(express.static(settings.http.static));
httpServer.listen(settings.http.port);
