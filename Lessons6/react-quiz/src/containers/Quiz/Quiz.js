import React, {Component} from 'react'
import classes from './Quiz.module.css'
import ActiveQuiz from '../../componets/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../componets/FinishedQuiz/FinishedQuiz'
import Loader from '../../componets/UI/Loader/Loader'
import {connect} from 'react-redux'
import {fetchQuizById, quizAnswerClick, retryQuiz} from '../../store/actions/quiz'

class Quiz extends Component{


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

    componentWillUnmount(){
        this.props.retryQuiz()
    }
    

    render(){
        return(
            <div className={classes.Quiz}>
                
                <div className={classes.QuizWrapper}>
                    <h1>Ответьте на все вопросы</h1>
                    {console.log(this.props.retryQuiz)}
                    {
                        
                        
                        this.props.loading || !this.props.quiz
                        ?<Loader/>
                        :this.props.isFinished
                        ? <FinishedQuiz
                            rezults={this.props.rezults}
                            quiz={this.props.quiz}
                            onRetry={this.props.retryQuiz}
                            
                          />
                        : <ActiveQuiz
                            answers={this.props.quiz[this.props.activeQuestion].answers}
                            question={this.props.quiz[this.props.activeQuestion].question}
                            onAnswerClick={this.props.quizAnswerClick}
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
        fetchQuizById: id => dispatch(fetchQuizById(id)),//редакс грузит тест
        quizAnswerClick: answerId =>dispatch(quizAnswerClick(answerId)), //обрабптывет клик
        retryQuiz: () => dispatch(retryQuiz())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz) //redux  