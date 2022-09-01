import {ADD_TO_FAVOURITES, ADD_MOVIES, REMOVE_FROM_FAVOURITES, SET_SHOW_FAVOURITES} from '../actions'

const initialMovieState = {list:[], favourites:[], showFavourites :  false}


export default function movies(state = initialMovieState, action){
     
   switch (action.type){

      case ADD_MOVIES:
         return {...state,
            list:action.movies
          }
      
      case ADD_TO_FAVOURITES:
         return {
            ...state,
            favourites:[action.movie,...state.favourites ]
         }
         
         case REMOVE_FROM_FAVOURITES :

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