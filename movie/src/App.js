import React, { Component } from 'react';
import './App.css';
import { Movies } from './movies.js';

const API_KEY = process.env.REACT_APP_API_KEY;

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      movies: null,
      moviesWithDetails: null,
      page: 1,
      pages: 1,
      total: null,
      loading: true,
      search: 'Star Wars', //initial search
      prevBtnClass: 'hidden-button',
      nextBtnClass: 'visible-button'
    };
  }

  componentDidMount() {
    this.fetchMovies(this.state.page, this.state.search);
  }

  fetchMovies(page, search) {
    if(!search) search ='Star Wars';
    this.setState({ movies:[], search });

    fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${search}&r=json&page=${page}`)
      .then(res => res.json())
      .then(data => {
        if(data.Response === 'False') console.log(data.Error); // should display something on the page if no results are found
        else {
          const total = data.totalResults;
          const pages = Math.ceil(data.totalResults / 10); //round up
          const movies = data.Search;
          this.setState({ total, pages, movies, loading: false });
          return movies;
        }
      });
      // .then(movies => {
      //   return movies.map(m => this.fetchMovieDetails(m.imdbID));
      // })
      // .then(moviesWithDetails => {
      //   console.log('moviesWithDetails', moviesWithDetails);
      //   this.setState({ moviesWithDetails });
      // });
  }

  fetchMovieDetails(imdbID) {
    fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}&r=json`)    
      .then(res => res.json())
      .then(data => {
        console.log('movie details found', data);
        return data;
      });
  }

  handlePageChange(incr) {
    const nextPage = Math.max(1, this.state.page + incr);
    this.setState({ page: nextPage });

    // you're going to the first page, can't go back
    if(this.state.page === 2 && incr === -1) {
      this.setState({
        prevBtnClass: 'hidden-button',
        nextBtnClass: 'visible-button'
      });
    }
    // you're going the last page, can't go forward
    else if(this.state.page === (this.state.pages - 1) && incr === 1) {
      this.setState({
        prevBtnClass: 'visible-button',
        nextBtnClass: 'hidden-button'
      });
    }
    // you're on an in between page, go either back or forward
    else {
      this.setState({
        prevBtnClass: 'visible-button',
        nextBtnClass: 'visible-button'
      });
    }

    this.fetchMovies(this.state.page, this.state.search);
  }

  render() {
    const {loading, movies} = this.state;
    
    if(loading) return <div>Loading Movies...</div>;
    if(loading === false && !movies) return <div>No Movies Found ¯\_(ツ)_/¯</div>; // does this ever happen?
    
    return (
      <div className="main">
        <h1>Let's Go to the Movies!</h1>
        <div>
          <Search onSearch={(search) => {
            this.setState({ page: 1 });
            this.fetchMovies(1, search);
          }} />
          <br/>
          <p>Found {this.state.total} movies like <em>{this.state.search}</em></p>
          <br/>
          <PageNavButton label="< Prev" incr={-1}
            className={this.state.prevBtnClass}
            onClick={this.handlePageChange.bind(this)} />
          
          <p id="nav-text">Page {this.state.page} of {this.state.pages}</p>
          
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
      <input name="search" placeholder="search a movie title"/>
      <button className="visible-button" type="submit">Search</button>
    </form>
  );
}

export default App;
