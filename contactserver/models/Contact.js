const Sequelize = require("sequelize");

module.exports = sequelize.define("contacts",{
    id:{
        type:Sequelize.INTEGER(11).UNSIGNED,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true,
    },
    name:{
        type:Sequelize.STRING(50),
        allowNull:false
    },
    phone:{
        type:Sequelize.STRING(50),
        allowNull:true
    },
    photograph:{
        type:Sequelize.STRING(50),
        allowNull:false
    },
    email:{
        type:Sequelize.STRING(50),
        allowNull:false,
        unique:true
    },
    is_favourite:{
        type:Sequelize.BOOLEAN(false)
    },
});