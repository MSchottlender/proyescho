const {Product,Address,Report} = require('../models');

exports.getLatestReport = async (params) => { //Mas tarde, necesitamos hacer un join. ASSOCIATION
    await Report.belongsTo(Product, {foreignKey: 'productId'});
    await Product.hasMany(Report, {foreignKey: 'id'});
    await Report.belongsTo(Address, {foreignKey: 'addressId'});
    await Address.hasMany(Report, {foreignKey: 'id'});
    
    const report = await Report.findAll({where: {}, 
                                         include: [{model: Product, where: {name: params.productName}},{
                                                   model: Address, where: {name: params.placeName,
                                                                         fullAddress: params.fullAddress}}],
                                         limit:1,         
                                         order: [['updatedAt', 'DESC']]                      });

    return report;
};

exports.createReport = async (params) => {
    console.log(params);
    const [product,isNewProduct] = await Product.findOrCreate({where: {name: params.productName},
                                                               defaults: {description: params.productDescription}});
    const [address,isNewAddress] = await Address.findOrCreate({where: {name: params.placeName,
                                                                       fullAddress: params.fullAddress},
                                                               defaults: {description: params.placeDescription}});
    const report =  await Report.create({productId: product.id,
                                         addressId: address.id,
                                         availability: params.availability,
                                         price: params.price,
                                         comment: params.comment});
    return report;
};
