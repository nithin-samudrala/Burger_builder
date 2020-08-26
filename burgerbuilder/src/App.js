import React,{Component} from 'react';
import Layout from "./components/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder"
import Checkout from './containers/Checkout/Checkout'
import Orders from './containers/Orders/Orders'
import { BrowserRouter, Route, Switch} from 'react-router-dom'
import Auth from './containers/Auth/Auth'
import Logout from './containers/Auth/logout'

import { connect} from 'react-redux'
import * as actionCreator from'./store/actions/index'

class App extends Component {
  componentDidMount(){
    this.props.onRelodeGetAuthToken()

  }
  render(){
    return (
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route path='/' exact component={BurgerBuilder}/>
            <Route path='/auth' component={Auth}/> 
            <Route path='/checkout' component={Checkout}/>
            <Route path='/orders' component={Orders}/>
            <Route path='/logout' component={Logout}/>
          </Switch>
        </Layout>
      </BrowserRouter>
      
    );
  }
  
}

const mapDispatchersToProps=dispatch=>{
  return{
    onRelodeGetAuthToken:()=>dispatch(actionCreator.authCheckState())
  }
}
export default connect(null,mapDispatchersToProps)(App);
