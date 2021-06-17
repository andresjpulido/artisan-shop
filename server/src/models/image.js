'use strict';
const { Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

    const Image = sequelize.define('image', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        id_product: DataTypes.INTEGER,
        description: DataTypes.STRING,
        fileData: Sequelize.BLOB,
        mimeType: DataTypes.STRING,
        fileName: DataTypes.STRING,
        url: DataTypes.STRING,
        createdAt: 'TIMESTAMP',
        updatedAt: 'TIMESTAMP'
    }, {
        sequelize,
        tableName: 'image'
    });

    Image.associate = function (models) {
        Image.belongsTo(models.product, {
            foreignKey: 'id_product'
        })
    };

    return Image;
};
