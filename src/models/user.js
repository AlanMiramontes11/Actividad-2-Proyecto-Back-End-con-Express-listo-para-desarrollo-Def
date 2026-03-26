const { DataTypes } = require('sequelize');

const sequelize = require('../config/db_postgre');

const user = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'user',
    timestamps: true
});

module.exports = user;