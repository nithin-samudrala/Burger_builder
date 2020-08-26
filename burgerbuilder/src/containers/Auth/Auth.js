import React,{Component} from 'react'
import Input from '../../components/Ui/Input/Input'
import classes from './Auth.css'
import Spinner from '../../components/Ui/spinner/spinner'

import {connect} from 'react-redux'
import * as actionCreator from '../../store/actions/index'

import { Redirect} from 'react-router-dom'

class Auth extends Component{
    state={
        inputs:{
            email:{
                elmentType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Email'
                },
                value:'',
                validation:{
                    required:true,
                    isEmail:true
                },
                valid:false,
                touched:false
            },
            password:{
                elmentType:'input',
                elementConfig:{
                    type:'password',
                    placeholder:'Password'
                },
                value:'',
                validation:{
                    required:true,
                    minLength:6
                },
                valid:false,
                touched:false
            },
        },
        isSignup:true,
        redirectPath:'/'
    }
    
    //if we alredy built a burger then user is redirected to checkout
    componentDidMount(){
        if(this.props.building){                
            this.setState({redirectPath:'/checkout'})
        }
    }
    checkValidation(value,rules){
        let isValid=true;
        
        if (!rules){
            return true
        }
        if(rules.required){
            isValid=value.trim() !==''      //checking wether the value is empty
        }
        if(rules.minLength){
            isValid=value.length>=rules.minLength && isValid
        }
        if(rules.maxLength){
            isValid=value.length<=rules.maxLength && isValid
        }
        if(rules.isEmail){
            const pattern=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            isValid=pattern.test(value) && isValid
        }
        return isValid
    }
    inputChangeHandler=(event,input)=>{
        const updatedInputs={
            ...this.state.inputs,
            [input]:{
                ...this.state.inputs[input],
                value:event.target.value,
                valid:this.checkValidation(event.target.value,this.state.inputs[input].validation),
                touched:true
            }
        }
        this.setState({inputs:updatedInputs})
    }

    onSubmit=event=>{
        event.preventDefault()
        this.props.onAuth(this.state.inputs.email.value,this.state.inputs.password.value,this.state.isSignup)
    }

    switchAuthModeHandler=()=>{
        this.setState(prevState=>{
            return{isSignup:!prevState.isSignup}
        })
    }


    render(){
        const formElementArray=[];
        for (let key in this.state.inputs){ //looping through login form 
            formElementArray.push({
                id:key,
                config:this.state.inputs[key]
            })
        }
        let form=formElementArray.map(formElement=>(
            <Input key={formElement.id}
            elmentType={formElement.config.elmentType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            valid={formElement.config.valid}
            shouldCheckValidation={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(event)=>this.inputChangeHandler(event,formElement.id)}/>
        ))
        if(this.props.loading){
            form=<Spinner/>
        }
        let errorMessage=null
        if(this.props.error){
            errorMessage=(<p>{this.props.error.message}</p>)
        }

        let loginRedirect=null
        if(this.props.authToken!=null){
            loginRedirect=<Redirect to={this.state.redirectPath}/>
        }

        return(
            <div className={classes.auth}>
                {errorMessage}
                {loginRedirect}    
                <form onSubmit={this.onSubmit}>
                    {form}
                    <button 
                        className={classes.switchCase} 
                        type='button'
                        onClick={this.switchAuthModeHandler}
                    >SWITCH TO {this.state.isSignup?'SIGN IN':'SIGN UP'}</button>
                    <button type='submit'>SUBMIT</button>
                </form>
            </div>
        )
    }
}
const mapStateToProps=state=>{
    return{
        loading:state.auth.loading,
        error:state.auth.error,
        authToken:state.auth.token,
        building:state.burgerBuilder.building
    }
}

const mapDispatchToProps=dispatch=>{
    return{
        onAuth:(email,password,isSignup)=>dispatch(actionCreator.auth(email,password,isSignup))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Auth)