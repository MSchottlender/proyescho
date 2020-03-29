module.exports = (sequelize, DataTypes) => {
  const Report = sequelize.define('Report', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    productId: { type: DataTypes.INTEGER, field: 'productId', allowNull: false},
    addressId: { type: DataTypes.INTEGER, field: 'addressId', allowNull: false},
    availability: { type: DataTypes.INTEGER, field: 'availability', allowNull: false},
    price: { type: DataTypes.INTEGER, field: 'price'},
    comment: { type: DataTypes.STRING, field: 'comment' },
    createdAt: { type: DataTypes.DATE, field: 'created_at' },
    updatedAt: { type: DataTypes.DATE, field: 'updated_at' }
  }, {
    timestamps: true,
    underscored: true,
    tableName: 'reports'
  });
  return Report;
};