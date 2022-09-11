import { combineReducers } from 'redux'
import {ADD_TO_FAVOURITES,
    ADD_MOVIES,
     REMOVE_FROM_FAVOURITES,
      SET_SHOW_FAVOURITES,
      ADD_SEARCH_RESULT,
       ADD_MOVIE_TO_LIST,
       REMOVE_SEARCH_RESULT_BOX} 
      from '../actions'

const initialMovieState = {list:[], favourites:[], showFavourites : false}
export  function movies(state = initialMovieState, action){
     
   switch (action.type){

      case ADD_MOVIES:
         // v r returning state as a new object(here state is object) with some updations to the old state object
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
      //   updatedFavourites.splice(index,1);
            const filteredArray = state.favourites.filter(movie=> movie.Title !== action.movie.Title );
            return {
               ...state,
            favourites:filteredArray
            }

            case SET_SHOW_FAVOURITES : 
            return{
               ...state,
               showFavourites: action.value
            }
          
            case ADD_MOVIE_TO_LIST :
             return {
               ...state, 
               list: [action.movie, ...state.list]
             }

      default : 
      return state;
     }
}


const initialSearchState = {
   result: [],
   showSearchResults: false

}
export function search(state = initialSearchState, action){
     switch (action.type){
        case ADD_SEARCH_RESULT:
         return {
            ...state,
             result:action.movies,
         showSearchResults : true
         }
         
       case ADD_MOVIE_TO_LIST: 
         return {
            ...state,
            showSearchResults : false
         }

         case REMOVE_SEARCH_RESULT_BOX : 
         return {
            ...state,
            showSearchResults : false
         }

         default :
         return state;
     }
}



// const initialRootState = {
//    movies: initialMovieState,
//    search: initialSearchState
// }

// ee function ezhthendathilla bcos redux take care of it with combine reducer ()
// export default function rootReducer(state = initialRootState, action){
//       return{
//          movies : movies(state.movies, action),
//          search: search(state.search, action)
//       }
// }
export default combineReducers(
  {  movies, //redux is smart enough to call this functions likethis :movies(state.movies, action), :search(state.search, action)
   search
  }
)