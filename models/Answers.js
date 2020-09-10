const Question = require('./Question')
const Sequelize = require("sequelize")
const db = require("../database/db");

module.exports = db.sequelize.define(
    'answers',
    {
        idanswers: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        questions_id: {
            type: Sequelize.INTEGER,
            references: {
                model: Question,
                key: 'idquestions'
            }
        },
        answer: {
            type: Sequelize.STRING
        },
        correct: {
            type: Sequelize.BOOLEAN,
            defaultValue: Sequelize.TRUE
        }
    },{
        timestamps: false
    }
);
