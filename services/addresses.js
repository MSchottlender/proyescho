const {Address} = require('../models');

exports.getAddresses = async () => {
    const addresses = await Address.findAll();
    return addresses;
};

exports.createAddress = async (params) => {
    const address = await Address.create(params);
    return address;
};