import React from "react";
import {connect} from 'react-redux';
// import { connect } from "..";
// import {  StoreContext } from "..";
import {
  handleMovieSearch,
  addMovieToList,
  handleClearedSearchBox,
} from "../actions";
import SearchResult from "./SearchResult";
// import {data} from '../data';

 

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
    };
  }

  handleChange = (e) => {
    if (e.target.value === "") {
      this.props.dispatch(handleClearedSearchBox());
    }
    this.setState(
      { searchText: e.target.value }
      // ,()=>{
      // if (this.state.searchText === ''){
      //   this.props.dispatch(handleClearedSearchBox())
      // }
      // }
    );
    // console.log('search-state',this.state.searchText);
  };

  handleSearch = () => {
    const { searchText } = this.state;
    this.props.dispatch(handleMovieSearch(searchText));
  };

  handleAddToMovies = (movie) => {
    this.props.dispatch(addMovieToList(movie));
  };

  render() {
    // we can rename result to movies by:
    const { result: movies, showSearchResults } = this.props.search;
    //  console.log('moviessss', movies);
    return (
      <div className="nav">
        <div className="search-container">
          <input onChange={this.handleChange} />
          <button id="search-btn" onClick={this.handleSearch}>
            Search
          </button>

          {/* {movies === undefined? <div className="search-results"><div className="search-result">no movie</div></div>:  */}

          {showSearchResults &&
            (movies === undefined ? (
              <div
                className="search-results"
                style={{
                  textAlign: "center",
                  fontWeight: 700,
                  padding: "10px",
                }}
              >
                No Such Movie Available
              </div>
            ) : (
              <div className="search-results">
                {movies.map((movie, index) => {
                  return (
                    <SearchResult
                      handleAddToMovies={this.handleAddToMovies}
                      movie={movie}
                      key={`movie-${index}`}
                    />
                  );
                })}
              </div>
            ))}
        </div>
      </div>
    );
  }
}

// class NavbarWrapper extends React.Component{
//   render(){
//     return(
//       <StoreContext.Consumer>
//         {(store)=><Navbar dispatch={store.dispatch} search={this.props.search}/>}
//       </StoreContext.Consumer>
//     )
//   }
// }

// export default NavbarWrapper;

//  destructuring
function mapStateToProps({ search }) {
  return {
    search,
  };
}
const ConnectedNavbarComponent = connect(mapStateToProps)(Navbar);

export default ConnectedNavbarComponent;
