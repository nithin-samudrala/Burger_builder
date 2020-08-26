import * as actionTypes from './actions'
import axios from 'axios'

export const authStart=()=>{
    return{
        type:actionTypes.AUTH_START
    }
}
export const authSuccess=(idToken,userId)=>{
    return{
        type:actionTypes.AUTH_SUCCESS,
        idToken:idToken,
        userId:userId
    }
}
export const logout=()=>{
    localStorage.removeItem("Token")
    localStorage.removeItem('expireDateTime')
    localStorage.removeItem('userId')
    return{
        type:actionTypes.USER_AUTH_EXPIRES
    }
}
export const userAuthExpires=(expirationTime)=>{   //expirationTime is 3600 seconds defauld exp time of firebase 
    return dispatch=>{
        setTimeout(()=>{
            dispatch(logout())
        },expirationTime*1000)      //sec to milly sec
    }
}
export const authFail=(error)=>{
    return{
        type:actionTypes.AUTH_FAIL,
        error:error
    }
}
export const auth=(email,password,isSignup)=>{
    return dispatch=>{
        dispatch(authStart())
        const authData={
            email:email,
            password:password,
            returnSecureToken: true
        }
        let URL='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='
        if(!isSignup){
            URL='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='
        }
        axios.post(URL,authData)
        .then(res=>{
            // console.log(res);
            const expireDateTime=new Date(new Date().getTime()+res.data.expiresIn*1000)     //sec to milly sec+time date
            localStorage.setItem("Token",res.data.idToken)
            localStorage.setItem('expireDateTime',expireDateTime)
            localStorage.setItem('userId',res.data.userId)
            dispatch(authSuccess(res.data.idToken,res.data.localId))
            dispatch(userAuthExpires(res.data.expiresIn))
        })
        .catch(err=>{
            // console.log(err.response.data);
            dispatch(authFail(err.response.data.error)) //error that comes firebase
        })
    }
}
//when reloaded we lose state and loose token so we get it from local storage
export const authCheckState=()=>{
    return dispatch=>{
        let token = localStorage.getItem('Token')
        if(!token){
            dispatch(logout())    //not nessary
        }else{
            const expirationTime=new Date(localStorage.getItem('expireDateTime'))

            if(expirationTime> new Date()){
                const userId=localStorage.getItem('userId')
                dispatch(authSuccess(token,userId))         //set userid and token of auth redux state
                // dispatch(userAuthExpires((expirationTime.getSeconds()- new Date().getSeconds()))/1000)
            }
            else{
                dispatch(logout())
            }
        }
    }

}
