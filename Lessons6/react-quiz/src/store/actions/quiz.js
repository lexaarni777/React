import axios from '../../axios/axios-quiz'
import { FETCH_QUZES_START, FETCH_QUZES_SUCCESS, FETCH_QUZES_ERROR, FETCH_QUIZ_SUCCESS } from './ActionTypes'

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