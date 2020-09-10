const express = require("express")
const questions = express.Router()
const cors = require('cors')


const Question = require("../models/Question")
const Answers = require("../models/Answers")
questions.use(cors())

Answers.belongsTo(Question,{foreignKey: 'questions_id'} );

process.env.SECRET_KEY = "secret"
var questionsData=[]
var answersData=[]


questions.get('/', (req, res) => {
    Question.findAll({})
    .then(data => {
        questionsData=data
        res.send(questionsData);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error ocurred while retriving questions"
        })
    })
})

questions.get('/:id/answers', (req, res) => {
  const id = req.params.id
    Answers.findAll({
        where : {questions_id: id}
    }).then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error ocurred while retriving questions"
        })
    })
})

questions.post('/', (req, res) => {
    const question = {
        question: req.body.question,
        published: req.body.published
    }

    Question.create(question)
    .then(item => {
        res.json({status: "Question "+ item.idquestions + " created!!!"})
    })
    .catch(err =>{
        res.send('error: ' + err)
    })
})

questions.post('/answers', (req, res) =>{
    const answer ={
        questions_id : req.body.questions_id,
        answer : req.body.answer,
        correct : req.body.correct
    }

    Answers.create(answer)
    .then(item => {
        res.json({status: "Answes "+ item.idanswers + " created!!!"})
    })
    .catch(err =>{
        res.send('error: ' + err)
    })

})

questions.put("/:idquestions", (req,res)=>{
    const idquestions = req.params.idquestions;

    Question.update(req.body, {
      where: { idquestions: idquestions }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Tutorial was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Question with id=${idquestions}. Maybe Question was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Question with id=" + idquestions
        });
      });
})

questions.put("/:idquestions/answer/:idanswers", (req,res)=>{
    const idquestions = req.params.idquestions;
    const idanswers = req.params.idanswers;

    Answers.update(req.body, {
      where: { idanswers:idanswers , questions_id: idquestions }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Answer was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Answer with id=${idanswers}. Maybe Answer was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Answer with id=" + idanswers
        });
      });
})

questions.delete("/:idquestions", (req,res)=>{
    const idquestions = req.params.idquestions;

    Answers.destroy({
        where: {questions_id: idquestions},
        truncate: false
        })
        .then(nums => {
          res.send({ message: `${nums} Answers were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all answers."
        });
    });

   Question.destroy({
    where: { idquestions: idquestions }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Tutorial was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Tutorial with id=${idquestions}. Maybe Tutorial was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + idquestions
      });
    })
});

questions.delete("/:idquestions/answer/:idanswers", (req,res)=>{
    const idanswers = req.params.idanswers;

    Answers.destroy({
        where: {idanswers: idanswers},
        truncate: false
        })
        .then(num => {
            if (num == 1) {
              res.send({
                message: "Answer was deleted successfully!"
              });
            } else {
              res.send({
                message: `Cannot delete Answer with id=${idanswers}. Maybe Tutorial was not found!`
              });
            }
          })
          .catch(err => {
            res.status(500).send({
              message: "Could not delete Answer with id=" + idanswers
            });
        })

})


module.exports = questions;