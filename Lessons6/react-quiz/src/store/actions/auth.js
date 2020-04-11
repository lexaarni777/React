import {AUTH_SUCCESS, AUTH_LOGOUT} from './ActionTypes'
import axios from 'axios'

export function auth(email, password, isLogin){
    return async dispatch => {
        const authData = {
            email, password,
            returnSecureToken: true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBG5Y0yvtH5O_HAgzxF7-J0CM0MkE3w2QQ'

        if (isLogin){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBG5Y0yvtH5O_HAgzxF7-J0CM0MkE3w2QQ'
        }
        const response = await axios.post(url, authData)
        const data = response.data
        
        const experationDate = new Date(new Date().getTime() + data.expiresIn * 100)

        localStorage.setItem('token', data.idToken)
        localStorage.setItem('userId', data.localId)
        localStorage.setItem('experationDate', experationDate)

        dispatch(authSuccess(data.idToken))
        dispatch(autoLogout(data.expiresIn))

    }
}

export function autoLogout(time){
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, time*1000)
    }
}

export function logout(){
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('experationDate')
    return {
        type: AUTH_LOGOUT
    }
}

export function autoLogin(){
    return dispatch => {
        const token = localStorage.getItem('token')

        if(!token){
            dispatch(logout())
        }else{
            const experationDate = new Date(localStorage.getItem('experationDate'))
            if(experationDate <= new Date()){
                dispatch(logout())
            }else{
                dispatch(authSuccess(token))
                dispatch(autoLogout((experationDate.getTime() - new Date().getTime())/1000))
            }
        }
    }
}

export function authSuccess(token){
    return{
        type: AUTH_SUCCESS,
        token
    }
}

