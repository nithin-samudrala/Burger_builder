import * as actionTypes from './actions'
import axios from '../../axios-orders'

export const purchaseBurgerFaild=(error)=>{
    return {
        type:actionTypes.PURCHASE_BURGER_FAILD,
        error:error
    }
}
export const purchaseBurgerSucces=(id,orderData)=>{
    return{
    type:actionTypes.PURCHASE_BURGER_SUCCESS,
    id:id,
    orderData:orderData
    }
}
//to load spinner
export const purchaseBurgerStart=()=>{
    return{
        type:actionTypes.PURCHASE_BURGER_START
    }
}
export const purchaseBurger=(dataPassingToFirebase,token)=>{
    return dispatch=>{
        dispatch(purchaseBurgerStart())
        axios.post('/orders.json?auth='+token,dataPassingToFirebase)
        .then(response=>{
            dispatch(purchaseBurgerSucces(response.data.name,dataPassingToFirebase))
        }).catch(error=>{
            dispatch(purchaseBurgerFaild(error))
        }
        )
    }
}

//after palcing order this gets called to redirect you back to burger builder
export const purchaseInit=()=>{
    return{
        type:actionTypes.PURCHASE_INIT
    }
}