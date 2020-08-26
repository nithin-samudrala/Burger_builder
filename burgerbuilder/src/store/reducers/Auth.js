import * as actionTypes from '../actions/actions'

const initialState={
    loading:false,
    token:null,
    userId:null,
    error:null
}
const reducer=(state=initialState,action)=>{
    switch(action.type){
        case(actionTypes.AUTH_START):
            return {
                ...state,
                error:null,
                loading:true
            }
        case(actionTypes.AUTH_SUCCESS):
            return {
                ...state,
                loading:false,
                token:action.idToken,
                userId:action.userId,
                error:null
            }
        case(actionTypes.AUTH_FAIL):
            return {
                ...state,
                loading:false,
                error:action.error
            }
        case(actionTypes.USER_AUTH_EXPIRES):
            return{
                ...state,
                token:null,
                userId:null
            }


        default:
            return state
    }

}

export default reducer