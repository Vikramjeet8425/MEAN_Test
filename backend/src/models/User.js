const { DataTypes } = require('sequelize');
const sequelize = require('../config/mysql');
const User = sequelize.define('user', {
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdAt:{
        type: DataTypes.DATE
    }
}, {
    timestamps: true,
    freezeTableName: true
});
module.exports = User;
