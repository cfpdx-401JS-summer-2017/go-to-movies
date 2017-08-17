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
      search: 'Star Wars',
      prevBtnClass: 'hidden',
      nextBtnClass: 'button'
    };
  }

  componentDidMount() {
    this.fetchMovies(this.state.page);
  }

  fetchMovies(page) {
    this.setState({ movies:[] });

    const url = `http://www.omdbapi.com/?apikey=${API_KEY}&s=${this.state.search}&r=json&page=${page}`;
    // console.log(url);
  
    fetch(url)    
      .then(res => res.json())
      .then(data => {
        if(data.Response === 'False') console.log(data.Error);
        else {
          const pages = Math.ceil(data.totalResults / 10); //round up
          const movies = data.Search;
          this.setState({ pages, movies, loading: false });
          // console.log('count of found movies', data.totalResults);
          // console.log('count of pages', pages);
          // console.log('count of movies in this set', data.Search.length);
          // return data.Search;
        }
      });
      // .then(movies => {
      //   const detailedMovies = {};
      //   movies.map((movie) => {
      //     return this.fetchMovieDetails(movie.imdbID);
      //       .then
      //     this.setState({ movies: detailedMovies });
      //   });
      // });
  }

  // fetchMovieDetails(imdbID) {
  //   // console.lot('OMG it worked!');
  //   const url = `http://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}&r=json`;
  
  //   fetch(url)    
  //     .then(res => res.json())
  //     .then(data => {
  //       if(data.Response) return data;
  //     });
  // }

  handlePageChange(incr) {
    if(this.state.page === 1 && incr === -1) {
      console.log('you are on the first page');
      //TODO: disable prev button
      this.setState({ prevBtnClass: 'hidden', nextBtnClass: 'button'});

    } else if(this.state.page === this.state.pages && incr === 1) {
      console.log('you are on the last page');
      //TODO: disable next button
      this.setState({ prevBtnClass: 'button', nextBtnClass: 'hidden'});

    } else {
      const nextPage = Math.max(1, this.state.page + incr);
      console.log('going to next page', nextPage);
      
      this.setState({ page: nextPage, prevBtnClass: 'button', nextBtnClass: 'button'});
      this.fetchMovies(nextPage);
    }
  }

  handleSearchChange(search) {
    //TODO: search doesn't alwasy work right
    console.log('searching for..."' + search + '"');
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
          <PageNavButton label="< Prev" incr={-1} className={this.state.prevBtnClass}
            onClick={this.handlePageChange.bind(this)} />
          <p>Page {this.state.page} of {this.state.pages}</p>
          <PageNavButton label="Next >" incr={1} className={this.state.nextBtnClass}
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
      <button type="submit">Search</button>
    </form>
  );
}

export default App;
