import React from 'react'
import classes from './Order.css'
const order =(props)=>{
    const ingredients=[]
    for (let ingredientName in props.ingredients ){
        ingredients.push({name:ingredientName,quantity:props.ingredients[ingredientName]})
    }
    const ingredientOutput=ingredients.map(ingredient=>{
        return <span className={classes.span}
                    key={ingredient.name}>
                    {ingredient.name} ({ingredient.quantity}) 
                </span>
    })
    return(
        <div className={classes.order}>
            <p>Ingredients:{ingredientOutput}</p>
            <p className={classes.cost}>cost:<strong>{props.cost}</strong></p>
        </div>
    )
}
export default order 