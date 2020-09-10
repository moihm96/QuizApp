import React, { Component } from 'react'
import Question from './QuestionsComponents/Questions/Question'
import Answer from './QuestionsComponents/Answers/Answer'

import {getList, getAnswers} from './UserFunctions'

class Landing extends Component {
  componentDidMount(){
    getList().then(data => {
      this.setState(
        {
          items: [...data]
        },
        () => {
          console.log(this.state.items)
          var jsonData = {};
          var i;
          for (i = 0; i < this.state.items.length; i++) {
            jsonData[i+1] = this.state.items[i].question
            getAnswers(this.state.items[i].idquestions).
            then(element => {this.setState({answersItem: data},
            )
            })
          }
          this.setState({quiestions: jsonData})
          console.log(jsonData)
        }
      )
    })
  }

   // initiating the local state
   constructor(){
     super()
     this.state = {
      answersItem: [],
      items: [],
      quiestions: {
          /**1: 'What US city is known as the "birthplace of jazz"?',
          2: 'What is the capital of Greece?',
          3: 'What planet gave birth to Superman?'*/
      },
      answers: {
          1: {
              1: 'Chicago',
              2: 'New Orleans',
              3: 'New York'
          },
          2: {
              1: 'Athens',
              2: 'Patras',
              3: 'Kalamata'
          },
          3: {
              1: 'Krypton',
              2: 'Mars',
              3: 'Saturn'
          }
      },
      correctAnswers: {
          1: '2',
          2: '1',
          3: '1'
      },
      correctAnswer: 0,
      clickedAnswer: 0,
      step: 1,
      score: 0
  }
   }

// the method that checks the correct answer
checkAnswer = answer => {
    const { correctAnswers, step, score } = this.state;
    if(answer === correctAnswers[step]){
        this.setState({
            score: score + 1,
            correctAnswer: correctAnswers[step],
            clickedAnswer: answer
        });
    }else{
        this.setState({
            correctAnswer: 0,
            clickedAnswer: answer
        });
    }
}

// method to move to the next question
nextStep = (step) => {
    this.setState({
        step: step + 1,
        correctAnswer: 0,
        clickedAnswer: 0
    });
}

render(){
    let { quiestions, answers, correctAnswer, clickedAnswer, step, score } = this.state;
    return(
        <div className="Content">
            {step <= Object.keys(quiestions).length ? 
                (<div>
                    <Question
                        question={quiestions[step]}
                    />
                    <Answer
                        answer={answers[step]}
                        step={step}
                        checkAnswer={this.checkAnswer}
                        correctAnswer={correctAnswer}
                        clickedAnswer={clickedAnswer}
                    />
                    <button
                    className="NextStep"
                    disabled={
                        clickedAnswer && Object.keys(quiestions).length >= step
                        ? false : true
                    }
                    onClick={() => this.nextStep(step)}>Next</button>
                </div>) : (
                    <div className="finalPage">
                        <h1>You have completed the quiz!</h1>
                        <p>Your score is: {score} of {Object.keys(quiestions).length}</p>
                        <p>Thank you!</p>
                    </div>
                )
            }
        </div>
    );
}
}

export default Landing
