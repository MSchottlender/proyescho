//const Product = require('../models').Product;
const {Product} = require('../models');

exports.getProducts = async () => {
    const products = await Product.findAll();
    return products;
};

exports.createProduct = async (params) => {
    const product = await Product.create(params);
    return product;
};
