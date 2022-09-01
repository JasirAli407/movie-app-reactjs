import React from "react";
import { addToFavourites, removeFromFavourites } from "../actions";

class MovieCard extends React.Component{

   handleFavouriteClick = ()=>{
      // console.log(this.props);
      const{movie} = this.props;
      // console.log(movie);
      this.props.dispatch(addToFavourites(movie))
   }

   handleUnfavouriteClick= ()=>{
      const {movie} = this.props;
      this.props.dispatch(removeFromFavourites(movie))

   }

    render(){   
       const {movie} = this.props;
       
        return(
           <div className="movie-card">
             
             <div className="left">
                <img src={movie.Poster} alt="movie-poster" />
             </div>
             <div className="right">
                <div className="title">{movie.Title}</div>
                <div className="plot">{movie.Plot}</div>

                <div className="footer">
                    <div className="rating">{movie.imdbRating}</div>

                    {this.props.isMovieFavourite ? <button className="unfavourite-btn" onClick={this.handleUnfavouriteClick}>Unfavourite</button> :<button className="favourite-btn" onClick={this.handleFavouriteClick}>Favourite</button>}
                    
                </div>                
             </div>
           </div> 
        )
    }
}

export default MovieCard