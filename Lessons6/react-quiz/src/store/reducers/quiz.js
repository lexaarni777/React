import { FETCH_QUZES_START, FETCH_QUZES_SUCCESS, FETCH_QUZES_ERROR, FETCH_QUIZ_SUCCESS, QUIZ_SET_STATE, FINISH_QUIZ, QUIZ_NEXT_QESTION, RETRY_QUIZ } from "../actions/ActionTypes"

const initialState = {
    quizes: [],
    loading: false,
    error: null,
    rezults: {},
    activeQuestion: 0,
    answerState: null,
    isFinished: false,
    quiz: null
}

export default function quizReducer(state = initialState, action){
switch(action.type){
    case FETCH_QUZES_START:
        return {
            ...state, loading: true
        }
    case FETCH_QUZES_SUCCESS:
        return {
            ...state, loading: false, quizes: action.quizes
        }
    case FETCH_QUZES_ERROR:
        return {
            ...state, loading: false, error: action.error
        }
    case FETCH_QUIZ_SUCCESS:
        return {
            ...state, loading: false, quiz: action.quiz
        }
    case QUIZ_SET_STATE:
        return {
            ...state, answerState: action.answerState, rezults: action.rezults
        }
    case FINISH_QUIZ:
        return {
            ...state, isFinished: true
        }
    case QUIZ_NEXT_QESTION:
        return{
            ...state, answerState: null, activeQuestion: action.number
        }
    case RETRY_QUIZ:
        return{
            ...state, activeQuestion: 0, answerState: null, isFinished: false, rezults: {}
        }
    default:
        return state
}
}