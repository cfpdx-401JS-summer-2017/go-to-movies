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
      search: 'Star Wars'
    };
  }

  componentDidMount() {
    this.fetchMovies(this.state.page);
  }

  fetchMovies(page) {
    
    this.setState({
      //TODO: search: ...
      movies:[]
    });

    const url = `http://www.omdbapi.com/?apikey=${API_KEY}&s=${this.state.search}&r=json&page=${page}`;
    console.log(url);
  
    fetch(url)    
      .then(res => res.json())
      .then(data => {
        console.log('count of found movies', data.totalResults);
        const pages = Math.ceil(data.totalResults / 10); //round up

        console.log('count of pages', pages);
        this.setState({ pages });

        console.log('count of movies in this set', data.Search.length);

        return data.Search;
      })
      .then(movies => this.setState({ movies, loading: false }));
  }

  handlePageChange(incr) {
    if(this.state.page === 1 && incr === -1) {
      console.log('you are on the first page');
      //TODO: disable prev button

    } else if(this.state.page === this.state.pages) {
      console.log('you are on the last page');
      //TODO: disable next button

    } else {
      const nextPage = Math.max(1, this.state.page + incr);
      console.log('going to next page', nextPage);

      this.setState({ page: nextPage });
      this.fetchMovies(nextPage);
    }
  }

  render() {
    const {loading, movies} = this.state;
    if(loading) return <div>Loading Movies...</div>;
    if(loading === false && !movies) return <div>No Movies Found ¯\_(ツ)_/¯</div>;
    
    return (
      <div>
        <h1>Find Movies</h1>

        <div>
          <label>
            Search Titles: 
            <input id="search" name="userSearch" type="text"
              onChange={({target}) => this.fetchMovies(1, target.value)} />
          </label>
          <br/>
          <p>Page {this.state.page} of {this.state.pages}</p>
          <PageNavButton label="< Prev" incr={-1} onClick={this.handlePageChange.bind(this)} />
          <PageNavButton label="Next >" incr={1} onClick={this.handlePageChange.bind(this)} />
        </div>

        <div>
          <Movies movies={movies} />
        </div>

      </div>
    );
  }
}

function PageNavButton({ onClick, incr, label }) {
  return (
    <button onClick={() => onClick(incr)}>
      {label}
    </button>
  );
}

export default App;
