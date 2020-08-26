import React ,{Component} from "react";
import Aux from "../../hoc/auxilary";
import Burger from '../../components/Burger/Burger'
import BulidControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/Ui/Modal/Modal'
import Ordersummary from "../../components/Burger/Ordersummary/Ordersummary";
import axios from '../../axios-orders'
import Spinner from "../../components/Ui/spinner/spinner";
import errorHandlerGlobal from '../../hoc/errorHandlerGlobal/errorHandlerGlobal'

import {connect} from 'react-redux'
import * as actionType from '../../store/actions/index'


class BurgerBuilder extends Component{
    state={
        purchasable:false,
        orderButtonClicked:false,
    }
    componentDidMount(){                //comp didMount is best place to fetch data
        this.props.getInitialIngredents()
    }
    updatePurchaseState=(ing) =>{
        // console.log(ing,'bye');
        let s=Object.keys(ing).map(ingKey=>{
            return ing[ingKey]
        }).reduce((sum,val)=>{
            return sum+val
        },0)
        // console.log(s);
        // purchasable=purchasable<0
        // this.setState({purchasable:s!==0})
        return s>0
    }
    // addIngridentHandler=type=>{
    //     const ingredientCount=this.state.ingredients[type]
    //     let updatedIngredients={
    //         ...this.state.ingredients
    //     }
    //     updatedIngredients[type]=ingredientCount+1;
    //     const updatedCost=this.state.cost+INGREDIENTS_COST[type];
    //     this.setState({cost:updatedCost,ingredients:updatedIngredients})
    //     // console.log(updatedIngredients,'hi');
    //     this.updatePurchaseState(updatedIngredients)
    // }
    // removeIngridentHandler=type=>{
    //     const ingredientCount=this.state.ingredients[type]
    //     if (ingredientCount<=0) {
    //         return;
            
    //     }
    //     const updatedIngredients={
    //         ...this.state.ingredients
    //     }
    //     updatedIngredients[type]=ingredientCount-1;
    //     const updatedCost=this.state.cost-INGREDIENTS_COST[type];
    //     this.setState({cost:updatedCost,ingredients:updatedIngredients})
    //     this.updatePurchaseState(updatedIngredients)
    // }
    purchaseHandler=()=>{
        if(this.props.authToken){
            this.setState({orderButtonClicked:true})
        }else{
            this.props.history.push('/auth')
        }
        
    }
    purchaseCancelHandler=()=>{
        this.setState({orderButtonClicked:false})
    }
    // execudes when oddernow button clicked
    purchaseContinueHandler=()=>{
        // const queryParms=[]                         //sending ingridents as url to checkout
        // for (let ingredient in this.state.ingredients){
        //     queryParms.push(encodeURIComponent(ingredient)+'='+encodeURIComponent(this.state.ingredients[ingredient]))
        // }
        // queryParms.push('cost='+this.state.cost)
        // const queryStr= queryParms.join('&')
        
        // this.props.history.push({
        //     pathname:'/checkout',
        //     search:'?'+queryStr
        // })
        this.props.purchaseInit()
        this.props.history.push('/checkout')
    }
    
    render(){
        const disabledInfo={
            ...this.props.ingredients
        }
        for(let key in disabledInfo){
            disabledInfo[key]=disabledInfo[key]<1
        }
        let ordersummary=null
        
        let burger=this.props.error ? <p>Request failed with status code 404</p>:<Spinner/>
        if(this.props.ingredients){
            burger=(
            <Aux>
                <Burger ingredients={this.props.ingredients}/>
                        <BulidControls 
                            cost={this.props.cost}
                            purchasable={this.updatePurchaseState(this.props.ingredients)}
                            add={this.props.onIngredentAdded}
                            remove={this.props.onIngredentRemoved}
                            ordered={this.purchaseHandler}
                            disabledInfo={disabledInfo}
                            authToken={this.props.authToken}/>
            </Aux>
        )
        ordersummary=<Ordersummary ingredients={this.props.ingredients} 
                        cancel={this.purchaseCancelHandler}
                        order={this.purchaseContinueHandler}
                        totalCost={this.props.cost}/>
        

        }
        return(
            <Aux>
                <Modal show={this.state.orderButtonClicked} clickedBackdrop={this.purchaseCancelHandler}>
                {ordersummary} 
                </Modal>
                {burger}
            </Aux>
        )
    }
}
//which propert should hold which slice of the sate
const mapStateToProps=state=>{
    return{
        ingredients:state.burgerBuilder.ingredients,
        cost:state.burgerBuilder.cost,
        error:state.burgerBuilder.error,
        authToken:state.auth.token
    }
}

const mapDispatchToPeops=dispatch=>{
    return{
        onIngredentAdded:(ingName)=>dispatch(actionType.addIngredient(ingName)),
        onIngredentRemoved:(ingName)=>dispatch(actionType.remIngredient(ingName)),
        getInitialIngredents:()=>dispatch(actionType.getInitialIngredents()),
        purchaseInit:()=>dispatch(actionType.purchaseInit())

    }
}

export default connect(mapStateToProps,mapDispatchToPeops)(errorHandlerGlobal(BurgerBuilder,axios));