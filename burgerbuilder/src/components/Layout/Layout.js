import React, { Component}from "react";
import Aux from '../../hoc/auxilary';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar'

import {connect} from 'react-redux'

class Layout extends Component{
    state={
        showMenu : false
    }
    menuHandler=()=>{
        const show=!this.state.showMenu
        this.setState({showMenu: show})
    }
    
    render(){
        return(
            <Aux>
                <Toolbar 
                    menuButtonClicked={this.menuHandler}
                    showMenu={this.state.showMenu} 
                    authToken={this.props.authToken}

                />
                <main className={classes.content}
                    id={this.state.showMenu? classes.show:null}>
                        {this.props.children}
                </main>
            </Aux>
        )

    }
}
//to show login log out conditionally using token
const mapStateToProps=state=>{
    return{
        authToken:state.auth.token
    }
}

export default connect(mapStateToProps)(Layout);