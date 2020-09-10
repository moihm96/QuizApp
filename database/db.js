const Sequelize = require("sequelize")
const db = {}
const sequelize = new Sequelize("catalogo", "root", "", {
    host: 'localhost',
    dialect: 'mysql',
    operatorAliases: false, 
    password:'Moi.1996',
    port:3306,
    pool:{
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db