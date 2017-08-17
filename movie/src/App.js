import React, { Component } from 'react';
import './App.css';
import { Movies } from './movies.js';

const API_KEY = process.env.REACT_APP_API_KEY;

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      movies: null,
      page: 1,
      pages: 1,
      loading: true,
      search: 'Star Wars', //initial search
      prevBtnClass: 'hidden-button',
      nextBtnClass: 'visible-button'
    };
  }

  componentDidMount() {
    this.fetchMovies(this.state.page);
  }

  fetchMovies(page) {
    this.setState({ movies:[] });

    // get the list of movies from search
    fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${this.state.search}&r=json&page=${page}`)    
      .then(res => res.json())
      .then(data => {
        if(data.Response === 'False') console.log(data.Error); // should display something on the page if no results are found
        else {
          const pages = Math.ceil(data.totalResults / 10); //round up
          this.setState({ pages });
          return data.Search;
        }
      })
      // get the details for each movie
      .then(movies => {
        console.log('movies found', movies);

        return movies.map(movie => {
          fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&i=${movie.imdbID}&r=json`)    
            .then(res => res.json())
            .then(data => {
              console.log('movie details found', data);
              return data; 
            });
        });
      })
      .then(movies => {
        console.log('movies with details', movies);
        this.setState({ movies, loading: false });
      });
  }

  handlePageChange(incr) {
    if(this.state.page === 1 && incr === -1) {
      this.setState({
        prevBtnClass: 'hidden-button',
        nextBtnClass: 'visible-button'
      });
    
    } else if(this.state.page === this.state.pages && incr === 1) {
      this.setState({
        prevBtnClass: 'visible-button',
        nextBtnClass: 'hidden-button'});
    
    } else {
      const nextPage = Math.max(1, this.state.page + incr);
      
      this.setState({
        page: nextPage,
        prevBtnClass: 'visible-button',
        nextBtnClass: 'visible-button'});
      this.fetchMovies(nextPage);
    }
  }

  handleSearchChange(search) {
    // console.log('searching for..."' + search + '"');
    if(!search) search = 'Star Wars';
    this.setState({ search });
    this.fetchMovies(1);
  }

  render() {
    const {loading, movies} = this.state;
    
    if(loading) return <div>Loading Movies...</div>;
    if(loading === false && !movies) return <div>No Movies Found ¯\_(ツ)_/¯</div>; // does this ever happen?
    
    return (
      <div className="main">
        <h1>Find Movies</h1>
        <div>
          <Search onSearch={(search) => this.handleSearchChange(search)} />
          <br/>
          <PageNavButton label="< Prev" incr={-1}
            className={this.state.prevBtnClass}
            onClick={this.handlePageChange.bind(this)} />
          
          <p>Page {this.state.page} of {this.state.pages}</p>
          
          <PageNavButton label="Next >" incr={1}
            className={this.state.nextBtnClass}
            onClick={this.handlePageChange.bind(this)} />
        </div>
        <div>
          <Movies movies={movies} />
        </div>
      </div>
    );
  }
}

function PageNavButton({ onClick, incr, label, className }) {
  return (
    <button onClick={() => onClick(incr)} className={className} >
      {label}
    </button>
  );
}

function Search({ onSearch }) {
  return (
    <form onSubmit={e => {
      e.preventDefault();
      const form = e.target;
      onSearch(form.elements.search.value);
    }} >
      <input name="search"/>
      <button className="visible-button" type="submit">Search</button>
    </form>
  );
}

export default App;
