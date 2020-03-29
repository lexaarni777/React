import React, {Component} from 'react'
import classes from './Quiz.module.css'
import ActiveQuiz from '../../componets/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../componets/FinishedQuiz/FinishedQuiz'
class Quiz extends Component{
    state = {
        rezults: {},
        activeQuestion: 0,
        answerState: null,
        isFinished: false,
        quiz: [
            {
                question: 'Какого цвета небо?',
                rightAnswerId: 2,
                id: 1,
                answers: [
                    {text: 'Красный', id: 1},
                    {text: 'Синий', id: 2},
                    {text: 'Черный', id: 3},
                    {text: 'Зеленый', id: 4}
                ]
            },
            {
                question: 'В каком году основали Санкт-Петербург?',
                rightAnswerId: 3,
                id: 2,
                answers: [
                    {text: '1700', id: 1},
                    {text: '1705', id: 2},
                    {text: '1703', id: 3},
                    {text: '1803', id: 4}
                ]
            }
        ]
    }

    onAnswerClickHendler = (answerId) =>{
        if(this.state.answerState){
            const key = Object.keys(this.state.answerState)[0]
                if(this.state.answerState[key] === 'success'){
                    return
                }
        }

        const question = this.state.quiz[this.state.activeQuestion]
        const rezults = this.state.rezults

        if(question.rightAnswerId === answerId){
            if(!rezults[question.id]){
                rezults[question.id] = 'success'
            }

            this.setState({
                answerState:{[answerId]: 'success',
                rezults}
            })

            const timeout = window.setTimeout(()=>{
                if(this.isQuizFinished()){
                    this.setState({
                        isFinished: true
                    })
                }else{
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null
                    })
                }
                window.clearTimeout(timeout)
            }, 1000)

        }else{
            rezults[question.id] = 'error'
            this.setState({
                answerState:{[answerId]: 'error'},
                rezults
            })
        }
    }

    isQuizFinished(){
        return this.state.activeQuestion + 1 === this.state.quiz.length
    }

    retryHendler = () => {
        this.setState({
            activeQuestion: 0,
            answerState: null,
            isFinished: false,
            rezults:[]
        })
    }

    render(){
        return(
            <div className={classes.Quiz}>
                
                <div className={classes.QuizWrapper}>
                    <h1>Ответьте на все вопросы</h1>
                    {
                        this.state.isFinished
                        ? <FinishedQuiz
                            rezults={this.state.rezults}
                            quiz={this.state.quiz}
                            onRetry={this.retryHendler}
                          />
                        : <ActiveQuiz
                            answers={this.state.quiz[this.state.activeQuestion].answers}
                            question={this.state.quiz[this.state.activeQuestion].question}
                            onAnswerClick={this.onAnswerClickHendler}
                            quizLenght={this.state.quiz.length}
                            answerNumber={this.state.activeQuestion + 1}
                            state={this.state.answerState}
                          />
                    }                    
                </div>
            </div>
        )

    }
}

export default Quiz