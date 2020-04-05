import React, {Component} from 'react'
import classes from './Auth.module.css'
import Button from '../../componets/UI/Button/Button'
import Input from '../../componets/UI/Input/Input'
import axios from 'axios'

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export default class Auth extends Component{

state = {
    isFormValid: false,
    formControls:{
        email: {
            value: '',
            type: 'email',
            label: 'Email',
            errorMassage: 'Введите корректный Email',
            valid: false,
            tocuhed: false,
            validation: {
                requied: true,
                email: true
            }
        },
        password: {
            value: '',
            type: 'password',
            label: 'Пароль',
            errorMassage: 'Введите корректный Пароль',
            valid: false,
            tocuhed: false,
            validation: {
                requied: true,
                minLength: 6
            }
        }
    }
}

loginHendler = async () => {
    const authData = {
        email: this.state.formControls.email.value,
        password: this.state.formControls.password.value,
        returnSecureToken: true
    }
    try{
        const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBG5Y0yvtH5O_HAgzxF7-J0CM0MkE3w2QQ', authData)
        console.log(response.data)
    }catch(e){
        console.log(e)
    }
}

registerHendler = async () => {
    const authData = {
        email: this.state.formControls.email.value,
        password: this.state.formControls.password.value,
        returnSecureToken: true
    }
    try{
        const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBG5Y0yvtH5O_HAgzxF7-J0CM0MkE3w2QQ', authData)
        console.log(response.data)
    }catch(e){
        console.log(e)
    }
    

}

submitHendler = event => {
    event.preventDefault()
}

validateControl(value, validation){
    if(!validation){
        return true
    }
    let isValid = true

    if(validation.requied){
        isValid = value.trim() !== '' && isValid
    }

    if(validation.email){
        isValid = validateEmail(value) && isValid
    }
    if(validation.minLength){
        isValid = value.length >= validation.minLength && isValid
    }
    return isValid
}

onChangeHandler = (event, controlName) => {
    
    const formControls = {...this.state.formControls}
    const control = {...formControls[controlName]}

    control.value = event.target.value
    control.touched = true
    control.valid = this.validateControl(control.value, control.validation)

    formControls[controlName] = control

    let isFormValid = true

    Object.keys(formControls).forEach(name => {
        isFormValid = formControls[name].valid && isFormValid
    })

    this.setState({
        formControls, isFormValid
    })
}

renderInputs(){
   return Object.keys(this.state.formControls).map((controlName, index)=>{
       const control = this.state.formControls[controlName]
        return(
            <Input
                key={controlName + index}
                type={control.type}
                value={control.value}
                valid={control.valid}
                touched={control.touched}
                label={control.label}
                errorMassage={control.errorMassage}
                sholdValidate={!!control.validation}
                onChange={event => this.onChangeHandler(event, controlName)}
            />
        )
    })
}

    render(){
        return(
            <div className={classes.Auth}>
                <div>
                    <h1>Авторизация</h1>

                    <form  className={classes.AuthForm} onSubmit={this.submitHendler}>
                        
                        {this.renderInputs()}

                        <Button 
                            type='success'
                            onClick={this.loginHendler}
                            disabled = {!this.state.isFormValid}
                        >Войти
                         </Button> 

                         <Button 
                            type='primary'
                            onClick={this.registerHendler}
                            disabled = {!this.state.isFormValid}
                        >Зарегестрирвоаться
                         </Button>
                         
                    </form>
                </div>
            </div>
        )
    }
}