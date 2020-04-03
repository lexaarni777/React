import React, {Component} from 'react'
import classes from './Quiz.module.css'
import ActiveQuiz from '../../componets/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../componets/FinishedQuiz/FinishedQuiz'
import axios  from '../../axios/axios-quiz'
import Loader from '../../componets/UI/Loader/Loader'

class Quiz extends Component{
    state = {
        rezults: {},
        activeQuestion: 0,
        answerState: null,
        isFinished: false,
        quiz: [],
        loading: true
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

    async componentDidMount(){
        try{
            const response = await axios.get(`quzes/${this.props.match.params.id}.json`)
            const quiz = response.data
            this.setState({
                quiz,
                loading: false
            })
        }catch(e){
            console.log(e)
        }
    }

    

    render(){
        return(
            <div className={classes.Quiz}>
                
                <div className={classes.QuizWrapper}>
                    <h1>Ответьте на все вопросы</h1>

                    {
                        this.state.loading
                        ?<Loader/>
                        :this.state.isFinished
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