import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import {Provider} from 'react-redux'
import { createStore,applyMiddleware,compose,combineReducers} from 'redux'
//3rd party middleware
import thunk from 'redux-thunk'
import reducerBurgerBuilder from './store/reducers/burgerBuilder'
import reducerOrder from './store/reducers/order'
import reducerAuth from './store/reducers/Auth'

//redux-devtools-extension(window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
//'compose' allows us to compose our own set of enhancers and middleware in just onekind 
//of enhancerlike dev tools
//unlock DevTools only in development
const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ :null || compose;

const rootReducer=combineReducers({
  burgerBuilder: reducerBurgerBuilder,
  order: reducerOrder,
  auth: reducerAuth
})


const store=createStore(rootReducer,composeEnhancers(applyMiddleware(thunk)))   //central store (state)

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
