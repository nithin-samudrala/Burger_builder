import React ,{ Component } from 'react'
import classes from './contactForm.css'
import Spinner from '../../../components/Ui/spinner/spinner'
import axios from '../../../axios-orders'
import Input from '../../../components/Ui/Input/Input'
import errorHandlerGlobal from '../../../hoc/errorHandlerGlobal/errorHandlerGlobal'

import {connect} from 'react-redux'
import * as actionTypes from '../../../store/actions/index'


class contactForm extends Component{
    state={
        orderform:{
            name:{
                elmentType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Name'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            phoneNO:{
                elmentType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Phone NO'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            email:{
                elmentType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'EMail'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            plotNo:{
                elmentType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Enter your address'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            town:{
                elmentType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Town'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            PINCode:{
                elmentType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'PIN Code'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            deliveryMethod:{
                elmentType:'select',
                elementConfig:{
                    options:[
                        {value:'fastest',displayValue:'Fastest'},
                        {value:'free',displayValue:'Free'}
                    ]
                },
                value:'fastest',
                validation:{},
                valid:true
            },
        
        },
        formValid:false
    }

    formOrderBtn=(event)=>{                 //subming form
        event.preventDefault()
        const formData={};
        for (let inputIdentifier in this.state.orderform){
            formData[inputIdentifier]=this.state.orderform[inputIdentifier].value
        }
        const dataPassingToFirebase={
            ingredients:this.props.ingredients,
            cost:this.props.cost,
            orderDeliveryData:formData,
            userId:this.props.userId
        }
        this.props.onOrderBurger(dataPassingToFirebase,this.props.authToken)
    }

    checkValidation(value,rule){
        let isValid=true;
        
        if(rule.required){
            isValid=value.trim() !==''      //checking wether the value is empty
        }
        return isValid
    }



    inputChangeHandler=(event,inputIdentifier)=>{       //for two way binding of input form
        const updatedOrderForm={                        //copying orderform
            ...this.state.orderform
        }
        updatedOrderForm[inputIdentifier].value=event.target.value
        // checking validation 
        updatedOrderForm[inputIdentifier].valid=this.checkValidation(updatedOrderForm[inputIdentifier].value,updatedOrderForm[inputIdentifier].validation)
        updatedOrderForm[inputIdentifier].touched=true

        //check wether the entire form is valid or not
        let formValid=true
        for(let inputIdentifier in updatedOrderForm){
            formValid=updatedOrderForm[inputIdentifier].valid && formValid
        }

        this.setState({orderform:updatedOrderForm, formValid:formValid})
        // console.log(event.target.value)
        
    }

    render(){
        const formElementArray=[];
        for (let key in this.state.orderform){ //looping through orderform inputs
            formElementArray.push({
                id:key,
                config:this.state.orderform[key]
            })
        }
        let form=(
                    <form onSubmit={this.formOrderBtn}>
                        
                        {formElementArray.map(formElement=>(
                            <Input 
                            key={formElement.id}
                            elmentType={formElement.config.elmentType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            valid={formElement.config.valid}
                            shouldCheckValidation={formElement.config.validation}
                            touched={formElement.config.touched}
                            changed={(event)=>this.inputChangeHandler(event,formElement.id)}/>
                        ))}

                        <button type='submit' disabled={!this.state.formValid}>Order</button>
                    </form>
                )
        if(this.props.loading){
            form=<Spinner/>
        }
        return(
            <div className={classes.form}>
                <h3>Enter your detatails</h3>
                {form}
            </div>
        )
    }
}
const mapStateToProps=state=>{
    return{
        ingredients:state.burgerBuilder.ingredients,
        cost:state.burgerBuilder.cost,
        loading:state.order.loading,
        authToken:state.auth.token,
        userId:state.auth.userId
    }
}
const mapDispatchTOProps=dispatch=>{
    return{
        onOrderBurger:(dataPassingToFirebase,authToken)=>dispatch(actionTypes.purchaseBurger(dataPassingToFirebase,authToken))
    }
}
   

export default  connect(mapStateToProps,mapDispatchTOProps)(errorHandlerGlobal(contactForm,axios))