import React from "react";
import {handleMovieSearch, addMovieToList,handleClearedSearchBox} from '../actions';
import SearchResult from './SearchResult'
// import {data} from '../data';

class Navbar extends React.Component{

  constructor(props){
    super(props);
    this.state ={
      searchText: ''
    }
  }

  handleChange = (e)=>{  
    if (e.target.value === ''){
      this.props.dispatch(handleClearedSearchBox())
    }
    this.setState({searchText: e.target.value}
      // ,()=>{
      // if (this.state.searchText === ''){
      //   this.props.dispatch(handleClearedSearchBox())
      // }
    // }
    )     
      // console.log('search-state',this.state.searchText);  
   
  }    
  

  handleSearch =  ()=>{
    const {searchText} = this.state;
    this.props.dispatch(handleMovieSearch(searchText)); 
  }

  handleAddToMovies = (movie)=>{
    this.props.dispatch(addMovieToList(movie));
  }


    render(){
        // we can rename result to movies by:
         const {result:movies,showSearchResults} = this.props.search;
         console.log('moviessss', movies);
        return(
           <div className="nav">
              <div className="search-container">
                <input onChange = {this.handleChange}/>
                <button id="search-btn" onClick={this.handleSearch}>Search</button>

                {showSearchResults &&
                 <div className="search-results">
                {movies.map((movie, index)=>{
                  return(
                   
                     <SearchResult handleAddToMovies= {this.handleAddToMovies} movie ={movie} key ={`movie-${index}`}/>
             
                  )
                })}
                 </div>
                
                }
                
              </div>                
           </div> 

          
        )
    }
}

export default Navbar