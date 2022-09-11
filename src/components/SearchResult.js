
function searchResult(props){
    const {movie} = props
    return(
        <div className="search-result">
        <img src={movie.Poster} alt="search-pic" />
       <div className="movie-info">
         <span>{movie.Title}</span>
         <button onClick={()=>{props.handleAddToMovies(movie)}}>
           Add to Movies
         </button>
       </div>
        </div>
    )
}

export default searchResult;