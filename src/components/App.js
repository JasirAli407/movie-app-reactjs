import React from 'react';
import {connect} from 'react-redux';
import {data} from '../data';
import Navbar from './Navbar';
import MovieCard from './MovieCard';
import {addMovies, setShowFavourites} from '../actions';
// import { StoreContext } from '..';
// import {connect} from '..';


// console.log('hii',data);

class App extends React.Component {

  componentDidMount(){
    // const {store} = this.props;          
    //       // listener on state changes
    // store.subscribe(()=>{ 
    //   this.forceUpdate(); // forceUpdate() will re-render our whole app component  
    // })

    this.props.dispatch(addMovies(data));


    // console.log('state', store.getState());

  }

  isMovieFavourite = (movie)=>{
    const {movies} =  this.props
     const {favourites} = movies
    //  console.log(favourites);
     const index = favourites.indexOf(movie)

     if(index !== -1){
        return true;
     }

     return false;
  }

  isFavouriteTab = (value)=>{
        this.props.dispatch(setShowFavourites(value))
  }

  render(){
    // console.log('render');
    // console.log(this.props.store.getState());

    const {movies, search} = this.props;
    const {list, favourites, showFavourites} = movies;
    const displayMovies = showFavourites ? favourites : list;
      // return (
        // ingne cheyymme jsxil mathre value kitt0o
          // <StoreContext.Consumer> 
           //   Consumer is  expecting a cb 
          //  { (store)=>{ //it will get the argument that we have passed when defining provider

          return (
          <div className="App">
          <Navbar search={search}/>     
          
          <div className='main'>

            <div className='tabs'>
              <div className= {`tab ${ showFavourites ? '': 'active-tabs'}`} onClick={()=> this.isFavouriteTab(false) }>Movies</div>
              <div className={`tab ${showFavourites && 'active-tabs'}`} onClick={()=> this.isFavouriteTab(true)}>Favourites</div>
            </div>
              
              <div className='list'>
                {displayMovies.map((movie, index)=>
              (<MovieCard movie={movie} key={`movies-${index}`} dispatch = {this.props.dispatch} isMovieFavourite = {this.isMovieFavourite(movie)}/>))
                }            
              </div>

             {displayMovies.length === 0 && <div className='no-movies' style={{fontSize: 28,textAlign: 'center' }}>No movies to display!</div>}
            </div>              
         </div>
         )
          // }
        // }
        // </StoreContext.Consumer>      
      // );
  }
}

// to get the value to the whole component we will create a appwrapper
    // class AppWrapper extends React.Component{
    //   render(){
    //     return (
    //       <StoreContext.Consumer>
    //         {(store)=><App store={store}/>}
    //       </StoreContext.Consumer>
    //     )
    //   }
    // }



// it will get root state of redux store as the argument
function mapStateToProps(state){
  return{
    movies: state.movies,
    search: state.search
  }
}
//-> cb says what data we need from the state,  the connect() will return another function;  passing app  will tell to which component the data need to be transferred;  component will get data as props ; look notes;
const connectedAppComponent = connect(mapStateToProps)(App);

// export default AppWrapper
export default connectedAppComponent;
