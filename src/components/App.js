import React from 'react';
import {data} from '../data';
import Navbar from './Navbar';
import MovieCard from './MovieCard';
import {addMovies, setShowFavourites} from '../actions';
// console.log('hii',data);


class App extends React.Component {

  componentDidMount(){
    const {store} = this.props;
          
          // listener on state changes
    store.subscribe(()=>{
      console.log('updated');
      //  console.log(this.props.store.getState())      
      this.forceUpdate(); // forceUpdate() will re-render our whole app component  
    })

    store.dispatch(addMovies(data));


    // console.log('state', store.getState());

  }

  isMovieFavourite = (movie)=>{
    const {movies} =  this.props.store.getState();
     const {favourites} = movies
    //  console.log(favourites);
     const index = favourites.indexOf(movie)

     if(index !== -1){
        return true;
     }

     return false;
  }

  isFavouriteTab = (value)=>{
        this.props.store.dispatch(setShowFavourites(value))
  }

  render(){
    console.log('render');
    const {movies} = this.props.store.getState()
    const {list, favourites, showFavourites} = movies;
    const displayMovies = showFavourites ? favourites : list;
      return (
        <div className="App">
          <Navbar store= {this.props.store}/>      
          
          <div className='main'>

            <div className='tabs'>
              <div className= {`tab ${ showFavourites ? '': 'active-tabs'}`} onClick={()=> this.isFavouriteTab(false) }>Movies</div>
              <div className={`tab ${showFavourites&& 'active-tabs'}`} onClick={()=> this.isFavouriteTab(true)}>Favourites</div>
            </div>
              
              <div className='list'>
                {displayMovies.map((movie, index)=>
              (<MovieCard movie={movie} key={`movies-${index}`} dispatch = {this.props.store.dispatch} isMovieFavourite = {this.isMovieFavourite(movie)}/>))
                }            
              </div>

             {displayMovies.length === 0 && <div className='no-movies' style={{fontSize: 28,textAlign: 'center' }}>No movies to display!</div>}
            </div>              
         </div>
    );
 }
}

export default App;
