import React from "react"
import classes from './Ordersummary.css'
import Aux from '../../../hoc/auxilary'

const ordersummary=(props)=>{
    const ingredients=Object.keys(props.ingredients).map(key=>{
        return <li key={key}>{key}:{props.ingredients[key]}</li>
    })

return(
    <Aux>
        <h3>Your order</h3>
        <p>Your ingredients:</p>
        <ul>
            {ingredients}
        </ul>
        <p><strong>Total Price:{props.totalCost}</strong></p>
        <p>Continue to checkout?</p>
        <button 
            className={[classes.ordersummaryBtn, classes.can].join(' ')} 
            onClick={props.cancel}
            >cancel</button>
        <button 
            className={[classes.ordersummaryBtn, classes.ord].join(' ')} 
            onClick={props.order}
            >Order now</button>
    </Aux>
)

}

export default ordersummary