import { combineReducers } from 'redux'
import {ADD_TO_FAVOURITES,
    ADD_MOVIES,
     REMOVE_FROM_FAVOURITES,
      SET_SHOW_FAVOURITES} 
      from '../actions'

const initialMovieState = {list:[], favourites:[], showFavourites :  false}


export  function movies(state = initialMovieState, action){
     
   switch (action.type){

      case ADD_MOVIES:
         // v r returning state as an object with some updations
         return {...state,
            list:action.movies
          }
      
      case ADD_TO_FAVOURITES:
         return {
            ...state,
            favourites:[action.movie,...state.favourites ]
         }
         
         case REMOVE_FROM_FAVOURITES :
           
      // njn ezhthyeth
      //    const index = state.favourites.indexOf(action.movie);
      //   const updatedFavourites = state.favourites;
      //          updatedFavourites.splice(index,1);
            const filteredArray = state.favourites.filter(movie=> movie.Title !== action.movie.Title )
            return {
               ...state,
            favourites:filteredArray
            }

            case SET_SHOW_FAVOURITES : 
            return{
               ...state,
               showFavourites: action.value
            }

         
         

      default : 
      return state;
     }
}
const initialSearchState = {
   result: {}
}

export function search(state = initialSearchState, action){
     return state;
}

const initialRootState = {
   movies: initialMovieState,
   search: initialSearchState
}



// ee function ezhthendathilla bcos redux take care of it with combine reducer ()
// export default function rootReducer(state = initialRootState, action){
//       return{
//          movies : movies(state.movies, action),
//          search: search(state.search, action)
//       }
// }


export function combineReducers({
   movies, //redux is smart enough to call this functions likethis:movies(state.movies, action),search(state.search, action)
   search
})
