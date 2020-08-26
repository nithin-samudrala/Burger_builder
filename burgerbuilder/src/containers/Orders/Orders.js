import React ,{Component} from "react";
import Order from '../../components/Order/Order'
import axious from '../../axios-orders'
import errorHandlerGlobal from '../../hoc/errorHandlerGlobal/errorHandlerGlobal'

import Spinner from '../../components/Ui/spinner/spinner'

import { connect} from 'react-redux'
import { Redirect } from "react-router-dom";
class Orders extends Component{
    state={
        orders:[],
        loading:true
    }
    componentDidMount(){
        const queryParams='?auth='+this.props.authToken+'&orderBy="userId"&equalTo="'+this.props.userId+'"'
        axious.get('/orders.json'+queryParams)                       //geting previous Orders data from firebase
        .then(result=>{
            // console.log(result)
            let orderData=[]
            for( let orderKey in result.data){
                orderData.push({
                    ...result.data[orderKey],
                    id:orderKey
                })
            }
            this.setState({loading:false,orders:orderData})
        }).catch(error=>{
            this.setState({loading:false})
        })

    }
    render(){

        let spinner=null
        if(this.state.loading){
            spinner=<Spinner/>
        }

        let redirect=null
        if(!this.props.authToken){
            redirect=<Redirect to='/'/>
        }

        return(
            <div>
                {redirect}
                {spinner}
                {this.state.orders.map(order=>
                    <Order
                    key={order.id}
                    cost={order.cost}
                    ingredients={order.ingredients}/>
                )}
            </div>
        )
    }
}
const mapStateToProps=state=>{
    return{
        authToken:state.auth.token,
        userId:state.auth.userId
    }
}

export default connect(mapStateToProps)(errorHandlerGlobal(Orders,axious))