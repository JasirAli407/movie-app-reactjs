import React from 'react';
import ReactDOM from 'react-dom/client';
import {createStore, applyMiddleware} from 'redux';

import './index.css';
import App from './components/App'; 
import rootReducer from './reducers'

// MIDDLEWARE
// this function will get an object as argument that contain dispatch() and getState() property of store
// function logger(obj, next, action)
// and internally redux will be doing like this : logger(obj)(next)(action)
// const logger = function ({dispatch, getState}){
//   return function(next){     
//     return function(action){
//       console.log('Action_Type:', action.type)
//       next(action);
//     }    
//   }   
// }

// the above code can be written as:
const logger = ({dispatch, getState})=> (next)=> (action)=>{
  // console.log('Action Type:', action.type);
  next(action)
}
  
// this is how thunk middleware created. we have a package redux-thunk so no ned to use this
const thunk= ({dispatch, getState})=> (next)=> (action)=> {  
  
 if( typeof action === 'function') return action(dispatch);

  next(action);
}

const store = createStore(rootReducer, applyMiddleware(logger, thunk));
// console.log('store', store);
// console.log('state',store.getState());
  
//  store.dispatch({type: 'ADD_MOVIES', movies:[{name:'Superman'}] });
//  console.log('after state',store.getState());


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App  store={store}/>
  </React.StrictMode>
);

