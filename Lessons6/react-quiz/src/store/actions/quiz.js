import axios from '../../axios/axios-quiz'
import { FETCH_QUZES_START, FETCH_QUZES_SUCCESS, FETCH_QUZES_ERROR, FETCH_QUIZ_SUCCESS, QUIZ_SET_STATE, FINISH_QUIZ, QUIZ_NEXT_QESTION, RETRY_QUIZ } from './ActionTypes'

export function fetchQuizes(){
    return async dispatch => {
        dispatch(fetchQuizesStart())
        try{
            const response = await axios.get('quzes.json', )
            const quizes = []
            Object.keys(response.data).forEach((key, index) => {
                quizes.push({
                  id: key,
                  name: `Тест № ${index + 1}`
                })
            })
            dispatch(fetchQuizesSuccess(quizes))
        }catch(e){
            dispatch(fetchQuizesError(e))
        }
    }
}

export function fetchQuizById(quizId){
    return async dispatch => {
        dispatch(fetchQuizesStart())
        try{
            const response = await axios.get(`quzes/${quizId}.json`)
            const quiz = response.data
            
            dispatch(fetchQuizSuccess(quiz))
        }catch(e){
            dispatch(fetchQuizesError(e))
        }
    }
}

export function quizSetState(answerState, rezults){
    return{
        type: QUIZ_SET_STATE,
        answerState, rezults
    }

}

export function finishQuiz(){

    return{
        type: FINISH_QUIZ,

    }
}

export function quizNextQestion(number){
    return{
        type: QUIZ_NEXT_QESTION,
        number
    }
}


export function quizAnswerClick(answerId){
    
    return (dispatch, getState) => {
        const state = getState().quiz

        if(state.answerState){
            const key = Object.keys(state.answerState)[0]
                if(state.answerState[key] === 'success'){
                    return
                }
        }

        const question = state.quiz[state.activeQuestion]
        const rezults = state.rezults

        if(question.rightAnswerId === answerId){
            if(!rezults[question.id]){
                rezults[question.id] = 'success'
            }

            dispatch(quizSetState({[answerId]: 'success'}, rezults))

            const timeout = window.setTimeout(()=>{
                if(isQuizFinished(state)){
                    dispatch(finishQuiz())
                }else{
                    dispatch(quizNextQestion(state.activeQuestion + 1))
                }
                window.clearTimeout(timeout)
            }, 1000)
        }else{
            rezults[question.id] = 'error'

            dispatch(quizSetState({[answerId]: 'error'}, rezults))
        }
    }
}

export function retryQuiz(){
    return{
        type: RETRY_QUIZ
    }
}

export function isQuizFinished(state){
    return state.activeQuestion + 1 === state.quiz.length
}

export function fetchQuizSuccess(quiz){
    return{
        type: FETCH_QUIZ_SUCCESS,
        quiz
    }
}

export function fetchQuizesStart(){
    return{
        type: FETCH_QUZES_START
    }
}

export function fetchQuizesSuccess(quizes){
    return{
        type: FETCH_QUZES_SUCCESS,
        quizes
    }
}

export function fetchQuizesError(e){
    return{
        type: FETCH_QUZES_ERROR,
        error: e
    }
}