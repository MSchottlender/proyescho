module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define('Address', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, field: 'name', allowNull: false },
    description: { type: DataTypes.STRING, field: 'description' },
    fullAddress: { type: DataTypes.STRING, field: 'fullAddress', allowNull: false },
    createdAt: { type: DataTypes.DATE, field: 'created_at' },
    updatedAt: { type: DataTypes.DATE, field: 'updated_at' }
  }, {
    timestamps: true,
    underscored: true,
    tableName: 'addresses'
  });
  return Address;
};