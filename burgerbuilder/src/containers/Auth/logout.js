import React,{Component} from 'react'
import { Redirect} from 'react-router-dom'

import {connect} from 'react-redux'
import * as actionCreator from '../../store/actions/index'

class logout extends Component{

    componentDidMount(){
        this.props.onLogout()

    }

    render(){
        return(<Redirect to='/'/>)
    }
}
const mapDispathcersToProps=dispatch=>{
    return{
        onLogout:()=>dispatch(actionCreator.logout())
    }
}

export default connect(null,mapDispathcersToProps)(logout)