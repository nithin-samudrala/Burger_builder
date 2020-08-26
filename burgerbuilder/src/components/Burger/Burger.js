import React from "react";

import classes from './Burger.css';
import BurgerInggredient from "./Burgeringeingredent/Burgeringeingredent";



const burger=(props)=>{
    let transIngredients=Object.keys(props.ingredients)                  //converting keys to array
    .map((igKey)=>{                                                      //maping through array of keys
        return [...Array(props.ingredients[igKey])]                      //returning a array ingredinets *no of ingredients 
        .map((_,index)=>{
            return <BurgerInggredient key={igKey+index} type={igKey}/>
        })
    }
    ).reduce((previous,present)=>{
        // console.log(previous,'hiii');
        return previous.concat(present)
    },[])

    //console.log(transIngredients);

    if(transIngredients.length ===0){
        transIngredients=<p>Add ingredients</p>

    }
    return(
        <div className={classes.Burger}>
            <BurgerInggredient type='bread-top'/>
            {transIngredients}
            <BurgerInggredient type='bread-bottom'/>
        </div>
    )
}

export default burger