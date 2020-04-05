import { FETCH_QUZES_START, FETCH_QUZES_SUCCESS, FETCH_QUZES_ERROR, FETCH_QUIZ_SUCCESS } from "../actions/ActionTypes"
import { fetchQuizesError } from "../actions/quiz"

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
    default:
        return state
}
}