import React from 'react'
import Burger from '../../Burger/Burger'
import classes from './CheckoutSummary.css'

const checkoutSummary =(props)=>{
    return(
        <div className={classes.checkoutSummary}>
            <Burger ingredients={props.ingredients}/>
        
        <button 
            className={[classes.ordersummaryBtn, classes.can].join(' ')} 
            onClick={props.cancel}
            >cancel</button>
        <button 
            className={[classes.ordersummaryBtn, classes.ord].join(' ')} 
            onClick={props.order}
            >Order now</button>
        </div>
    )
}
export default checkoutSummary