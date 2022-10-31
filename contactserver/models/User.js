const Sequelize = require("sequelize");

module.exports = sequelize.define("users",{
    id:{
        type:Sequelize.INTEGER(11).UNSIGNED,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true,
    },
    first_name:{
        type:Sequelize.STRING(50),
        allowNull:false
    },
    middle_name:{
        type:Sequelize.STRING(50),
        allowNull:true
    },
    last_name:{
        type:Sequelize.STRING(50),
        allowNull:false
    },
    email:{
        type:Sequelize.STRING(50),
        allowNull:false,
        unique:true
    },
    password:{
        type: Sequelize.TEXT
    },
});