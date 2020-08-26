import * as actionType from './actions'

import axios from '../../axios-orders'

//action creators
export const addIngredient=(ingName)=>{
    return{type: actionType.ADD_INGREDIENT,ingredientName:ingName}
}

export const remIngredient=(ingName)=>{
    return{type: actionType.REM_INGREDIENT,ingredientName:ingName}
}

export const setInitialIngredents= ingredients=>{
    return{
        type:actionType.SET_INITIAL_INGREDIENTS,
        ingredients:ingredients
    }
}
export const fetchingIngredientsFaild=()=>{
    return{
        type:actionType.FETCHING_INGREDIENTS_FAILD
    }
}


export const getInitialIngredents=()=>{
    return dispatch=>{
        axios.get('/ingredients.json')
        .then(responce=>{
            dispatch(setInitialIngredents(responce.data))
        }).catch(error=>{
            dispatch(fetchingIngredientsFaild())
        })

    }
}