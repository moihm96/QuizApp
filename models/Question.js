const Sequelize = require("sequelize")
const db = require("../database/db")

module.exports = db.sequelize.define(
    'question',
    {
        idquestions: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        question: {
            type: Sequelize.STRING
        },
        published: {
            type: Sequelize.BOOLEAN,
            defaultValue: Sequelize.TRUE
        }
    },{
        timestamps: false
    }
);