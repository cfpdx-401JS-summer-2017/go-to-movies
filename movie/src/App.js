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
      loading: true
    };
  }

  componentDidMount() {
    this.fetchMovies(this.state.page);
  }

  fetchMovies(page) {
    this.setState({ movies:[] });
  
    fetch(`http://www.omdbapi.com/?s=Star&r=json$page${page}&apikey=${API_KEY}`)    
      .then(res => res.json())
      .then(data => data.Search)
      .then(movies => {
        this.setState({ movies, loading: false });
      });
  }

  handlePageChange(incr) {
    const page = Math.max(1, this.state.page + incr);
    this.setState({ page });
    this.fetchMovies(page);
  }

  render() {
    const {loading, movies} = this.state;
    if(loading) return <div>Finding Movies...</div>;

    return (
      <div>
        <h1>Find Movies</h1>

        <Movies movies={movies} />
      </div>
    );
  }
}

export default App;
