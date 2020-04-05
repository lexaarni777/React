import React, {Component} from 'react'
import classes from './Quiz.module.css'
import ActiveQuiz from '../../componets/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../componets/FinishedQuiz/FinishedQuiz'
import axios  from '../../axios/axios-quiz'
import Loader from '../../componets/UI/Loader/Loader'
import {connect} from 'react-redux'
import {fetchQuizById} from '../../store/actions/quiz'

class Quiz extends Component{

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

    componentDidMount(){
       this.props.fetchQuizById(this.props.match.params.id)
    }

    

    render(){
        return(
            <div className={classes.Quiz}>
                
                <div className={classes.QuizWrapper}>
                    <h1>Ответьте на все вопросы</h1>

                    {
                        
                        this.props.loading || !this.props.quiz
                        ?<Loader/>
                        :this.props.isFinished
                        ? <FinishedQuiz
                            rezults={this.props.rezults}
                            quiz={this.props.quiz}
                            onRetry={this.retryHendler}
                          />
                        : <ActiveQuiz
                            answers={this.props.quiz[this.props.activeQuestion].answers}
                            question={this.props.quiz[this.props.activeQuestion].question}
                            onAnswerClick={this.onAnswerClickHendler}
                            quizLenght={this.props.quiz.length}
                            answerNumber={this.props.activeQuestion + 1}
                            state={this.props.answerState}
                          />                      
                    }                    
                </div>
            </div>
        )

    }
}

function mapStateToProps(state){
    return {
        rezults: state.quiz.rezults,
        activeQuestion: state.quiz.activeQuestion,
        answerState: state.quiz.answerState,
        isFinished: state.quiz.isFinished,
        quiz: state.quiz.quiz,
        loading: state.quiz.loading
    }
}

function mapDispatchToProps(dispatch){
    return{
        fetchQuizById: id => dispatch(fetchQuizById(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz) //redux  