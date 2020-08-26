import React ,{Component} from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactForm from './contactForm/contactForm'
import { Route, Redirect} from 'react-router-dom'

import {connect} from 'react-redux'

class checkout extends Component {
    // state={
    //     ingredients:null,
    //     cost:0
    // }

    // componentWillMount(){
    //     let cost=0
    //     const query= new URLSearchParams(this.props.location.search)
    //     //['salad','1']
    //     const ingredients={}
    //     for (let parms of query.entries()){
    //         if(parms[0]==='cost'){
    //             cost=parms[1]
    //         }
    //         else{
    //             ingredients[parms[0]]=+parms[1];
    //         }
    //     }
    //     this.setState({ingredients:ingredients,cost:cost})
    // }
    
    checkoutCancelHandler=()=>{
        this.props.history.goBack()
    }
    checkoutContinueHandler=()=>{
        this.props.history.replace('/checkout/contact-form')
    }
    render(){
        let summary=<Redirect to='/'/>

        if (this.props.ingredients){
            let purchasedRedirect=this.props.purchased?<Redirect to='/'/>:null
            summary=(
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary 
                        ingredients={this.props.ingredients}
                        cancel={this.checkoutCancelHandler}
                        order={this.checkoutContinueHandler}
                    />
                    
                    <Route path={this.props.match.path +'/contact-form'} component={ContactForm}/>
                </div>
            )
        }
        return(
            <div>
                {summary}
                
            </div>
        )
    }
}
const mapStateToProps=state=>{
    return{
        ingredients:state.burgerBuilder.ingredients,
        purchased:state.order.purchased
    }
}


export default connect(mapStateToProps)(checkout)