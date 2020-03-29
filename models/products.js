module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define(
      'Product',
      {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING, field: 'name', allowNull: false },
        description: { type: DataTypes.STRING, field: 'description'},
        createdAt: { type: DataTypes.DATE, field: 'created_at' },
        updatedAt: { type: DataTypes.DATE, field: 'updated_at' }
      },
      {
        timestamps: true,
        underscored: true,
        tableName: 'products'
      }
    );
    return Product;
  };
