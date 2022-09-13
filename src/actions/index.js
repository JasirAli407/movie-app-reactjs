// action types
export const ADD_MOVIES = "ADD_MOVIES";
export const ADD_TO_FAVOURITES = "ADD_TO_FAVOURITES";
export const REMOVE_FROM_FAVOURITES = "REMOVE_FROM_FAVOURITES";
export const SET_SHOW_FAVOURITES = "SET_SHOW_FAVOURITES";
export const ADD_SEARCH_RESULT = "ADD_SEARCH_RESULT";
export const ADD_MOVIE_TO_LIST = "ADD_MOVIE_TO_LIST";
export const REMOVE_SEARCH_RESULT_BOX = "REMOVE_SEARCH_RESULT_BOX"


// action creators
export function addMovies(movies){
    return { 
      type: ADD_MOVIES,
      movies
    }
}

export function addToFavourites(movie){
  // console.log(movie);
  return { 
    type: ADD_TO_FAVOURITES,
    movie
  }
}

export function removeFromFavourites(movie){
return {
  type: REMOVE_FROM_FAVOURITES,
  movie
}
}

export function setShowFavourites(value){
  return {
    type: SET_SHOW_FAVOURITES,
    value
  }
  }

export function handleMovieSearch(searchText){
  const url = `http://www.omdbapi.com/?apikey=3329c6b&s=${searchText}`

  return function(dispatch){
    fetch(url)
    .then(res =>{
      // console.log('res',res);
     return  res.json()})
    .then((movies) =>{
      // console.log("movies-fetch-api", movies);

      // dispatch an action
      dispatch(addMovieSearchResult(movies.Search));
    })
 }
}

export function addMovieSearchResult(movies){
  return{
    type:ADD_SEARCH_RESULT,
     movies
  }
}

export function addMovieToList(movie){
  return {
    type: ADD_MOVIE_TO_LIST,
    movie
  }
}

export function handleClearedSearchBox(){
  return {
     type : REMOVE_SEARCH_RESULT_BOX,
       }
}