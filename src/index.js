import React  from "react";
// import { createContext } from "react";
import ReactDOM from "react-dom/client";
import {Provider} from 'react-redux';
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import "./index.css";
import App from "./components/App";
import rootReducer from "./reducers";


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
const logger =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    if (typeof action !== "function") {
      // console.log('Action Type:', action.type);
    }
    next(action);
  };

//  this is how THUNK middleware created. we have a package redux-thunk so no need to use this
// const thunk= ({dispatch, getState})=> (next)=> (action)=> {
//  if( typeof action === 'function') return action(dispatch);
//   next(action);
// }

const store = createStore(rootReducer, applyMiddleware(logger, thunk));
// console.log('store', store);
// console.log('state',store.getState());

//  store.dispatch({type: 'ADD_MOVIES', movies:[{name:'Superman'}] });
//  console.log('after state',store.getState());

// export const StoreContext = createContext();
// console.log('StoreContext',StoreContext);

// v r making a class provider to so that we can modify as we need
    // class Provider extends React.Component{
    //   render(){
    //     const {store} = this.props;
    //     return (<StoreContext.Provider value={store}>
    //        {this.props.children}
    //     </StoreContext.Provider>)
    //   }
    // }



// export function connect(callback) {
//   return function (Component) {
//     class ConnectedComponent extends React.Component {
//       constructor(props) {
//         super(props);
//         this.unsubscribe = this.props.store.subscribe(() =>
//           this.forceUpdate()
//         );
//       }

//       componentWillUnmount(){
//         this.unsubscribe();
//       }
//       render() {
//         const state = this.props.store.getState();
//         const dataToBePassedAsProps = callback(state);
//         return (
//           // when we spread, it is same as writting:  movies = {state.movies} search={state.search}
//           <Component {...dataToBePassedAsProps} dispatch={store.dispatch} />
//         );
//       }
//     }

//     class ConnectedComponentWrapper extends React.Component {
//       render() {
//         return (
//           <StoreContext.Consumer>
//             {(store) => <ConnectedComponent store={store} />}
//           </StoreContext.Consumer>
//         );
//       }
//     }
//     return ConnectedComponentWrapper;
//   };
// }

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  //<StoreContext.Provider value={store}> // we"ll create a class instead of this as we can modify as per need
  // we wrap here so the app and all descendant component will get access to value
  <Provider store={store}>
    <React.StrictMode>
      <App store={store} />
    </React.StrictMode>
  </Provider>
  //</StoreContext.Provider>
);
