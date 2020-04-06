import {CREATE_QUIZ_QUESTION, RESET_QUIZ_CREATOR} from './ActionTypes'
import axios from '../../axios/axios-quiz'


export function createQuizQuestion(item){
    return{
        type: CREATE_QUIZ_QUESTION,
        item
    }
}

function resetQuizCreator(){
    return{
        type: RESET_QUIZ_CREATOR
    }
}

export function finishCreateQuiz(){
    return async (dispatch, getState) => {
        await axios.post('quzes.json', getState().create.quiz)
        dispatch(resetQuizCreator())
    }
}

