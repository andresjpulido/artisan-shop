'use strict';
const { Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

    const productImage = sequelize.define('productImage', {
        id_product: {
            type: DataTypes.INTEGER,
            references: {
                modelName: "product",
                key: 'id_product'
            }
        },
        id_image: {
            type: DataTypes.INTEGER,
            references: {
                modelName: "image",
                key: 'id_image'
            }
        }
    });

    return productImage;
};