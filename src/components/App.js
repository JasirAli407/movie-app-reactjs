import React from 'react';
import {data} from '../data';
import Navbar from './Navbar';
import MovieCard from './MovieCard';
import {addMovies, setShowFavourites} from '../actions';
// console.log('hii',data);


class App extends React.Component {

  componentDidMount(){
    const {store} = this.props;
     
    store.subscribe(()=>{
      // console.log('updated')
      //  console.log(this.props.store.getState())

      // forceUpdate() will re-render our whole app component
      this.forceUpdate()
    })
    store.dispatch(addMovies(data))


    // console.log('state', store.getState());

  }

  isMovieFavourite = (movie)=>{
     const {favourites} = this.props.store.getState()
    //  console.log(favourites);
     const index = favourites.indexOf(movie)

     if(index !== -1){
        return true;
     }

     return false;
  }

  switchTab = (value)=>{
        this.props.store.dispatch(setShowFavourites(value))
  }

  render(){
    // console.log('render');
    const {list, favourites, showFavourites} = this.props.store.getState();
    const displayMovies = showFavourites ? favourites : list;
      return (
        <div className="App">
          <Navbar />      

          <div className='main'>

            <div className='tabs'>
              <div className= {`tab ${showFavourites? '': 'active-tabs'}`} onClick={()=> this.switchTab(false) }>Movies</div>
              <div className={`tab ${showFavourites&& 'active-tabs'}`} onClick={()=> this.switchTab(true)}>Favourites</div>
            </div>
              
              <div className='list'>
                {displayMovies.map((movie, index)=>
              (<MovieCard movie={movie} key={`movies-${index}`} dispatch = {this.props.store.dispatch} isMovieFavourite = {this.isMovieFavourite(movie)}/>))
                }            
              </div>
             {displayMovies.length === 0 && <div className='no-movies'>No movies to display!</div>}
            </div>              
         </div>
    );
 }
}

export default App;
