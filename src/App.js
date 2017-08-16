import React, { Component } from 'react';
import './App.css';
import { Movies } from './movies/Movies';

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
    const title = 'something';
    this.setState({
      movies: []
    });

  fetch(`http://www.omdbapi.com/?s=${encodeURI(title)}&plot=short&r=json&page=${page}&apikey=${API_KEY}`)
    .then(res => res.json())
    .then(data => data.Search)
    .then(movies => {
      this.setState({
        movies,
        loading: false
      });
    });
  }

  handlePageChange(incr) {
    const page = Math.max(1, this.state.page + incr);
    this.setState({ page });
    this.fetchMovies(page);
  }

  render() {
    const { loading, movies } = this.state;
    if(loading) return <div>Loading...</div>;

    return (
      <div>
        <PagingButton label="Prev Page" incr={-1} onClick={this.handlePageChange.bind(this)} />
        <PagingButton label="Next Page" incr={1} onClick={this.handlePageChange.bind(this)} />
        <Movies movies={movies} />
      </div>
    );
  }
}

function PagingButton({ onClick, incr, label }) {
  return (
    <button onClick={() => onClick(incr)}>
      {label}
    </button>
  );
}

export default App;
