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
    // console.log('search', title);

    this.setState({ movies:[] });
  
    fetch(`http://www.omdbapi.com/?s=${this.state.search}&plot=short&r=json$page${page}&apikey=${API_KEY}`)    
      .then(res => res.json())
      .then(data => {
        console.log('count of found movies', data.totalResults);
        const pages = Math.ceil(data.totalResults / 10); //round up

        console.log('count of pages', pages);
        this.setState({ pages });

        return data.Search;
      })
      .then(movies => this.setState({ movies, loading: false }));
  }

  handlePageChange(incr) {
    if(this.state.page === this.state.pages) {
      console.log('you are on the last page');
    } else {
      const page = Math.max(1, this.state.page + incr);
      console.log('going to page...', page);
      this.setState({ page });
      this.fetchMovies(page);
    }
  }

  // findMovies() {
  //   let search = 'GodFather';

  //   this.fetchMovies(1, search);
  // }
  
  /* <label>
            Search Titles: 
            <input id="search" name="userSearch" type="text"
              onChange={({target}) => this.fetchMovies(1, target.value)} />
          </label>
          <br/> */

  // if(!movies) return <div>No Movies Found ¯\_(ツ)_/¯</div>;
  render() {
    const {loading, movies} = this.state;
    if(loading) return <div>Finding Movies...</div>;

    return (
      <div>
        <h1>Find Movies</h1>

        <div>
          
          <PageNavButton label="Prev" incr={-1} onClick={this.handlePageChange.bind(this)} />
          <PageNavButton label="Next" incr={1} onClick={this.handlePageChange.bind(this)} />
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
