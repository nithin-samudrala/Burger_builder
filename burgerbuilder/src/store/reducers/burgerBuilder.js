import * as actionTypes from '../actions/actions'

const initialState={
    ingredients:null,
    cost: 50,
    error:false,
    building:false                                  //started building burger
}
const INGREDIENTS_COST={                                       //gloobal variables naming convention
    salad:10,
    bacon:5,
    cheese:10,
    meat:15

}
const reducer=(state=initialState,action)=>{
    switch(action.type){

        case actionTypes.ADD_INGREDIENT:
            return{
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]:state.ingredients[action.ingredientName]+1
                },
                cost:state.cost+INGREDIENTS_COST[action.ingredientName],
                building:true

            }

        case actionTypes.REM_INGREDIENT:
            return{
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]:state.ingredients[action.ingredientName]-1
                },
                cost:state.cost-INGREDIENTS_COST[action.ingredientName]
            }

        case actionTypes.SET_INITIAL_INGREDIENTS:
            return{
                ...state,
                ingredients:action.ingredients,
                error:false,
                cost: 50,
                building:false
            }

        case actionTypes.FETCHING_INGREDIENTS_FAILD:
            return{
                ...state,
                error:true

            }

        default:
            return state
    }

    
}

export default reducer