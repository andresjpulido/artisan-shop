'use strict';
const { Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

    const Product = sequelize.define('product', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        description: DataTypes.STRING,
        id_size: DataTypes.INTEGER,
        id_productType: DataTypes.INTEGER,
        id_location: DataTypes.INTEGER,
        url: DataTypes.STRING,
        is_online: DataTypes.BOOLEAN,
        code: DataTypes.STRING,
        createdAt: 'TIMESTAMP',
        updatedAt: 'TIMESTAMP'
    }, {
        sequelize,
        tableName: 'product'
    });

    Product.associate = function (models) {
        Product.belongsTo(models.size, {
            foreignKey: 'id_size'
        }),
        Product.belongsTo(models.productType, {
            foreignKey: 'id_productType'
        })
        Product.belongsTo(models.order, {
            foreignKey: 'id_order'
        })
        Product.belongsTo(models.location, {
            foreignKey: 'id_location'
        })
        Product.hasMany(models.image, { 
            foreignKey: 'id_product' , as: 'images'
        })
    };

    return Product;
};