import React, { Component } from 'react';
import './App.css';
import { Movies } from './movies/Movies';
import { PagingButton } from './Paging';
import { SearchForm } from './Search';

const API_KEY = process.env.REACT_APP_API_KEY;

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      movies: null,
      page: 1,
      loading: true,
      search: null,
    };

  }

  componentDidMount() {
    this.fetchMovies(this.state.page, this.state.search);
  }

  fetchMovies(page, search) {
    this.setState({
      movies: [],
      search: search
    });

    fetch(`http://www.omdbapi.com/?s=${search}&plot=short&r=json&page=${page}&apikey=${API_KEY}`)
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
        <SearchForm onSearch={(search) => this.fetchMovies( 1, search )}/>
        <div>{this.state.search}</div>
        <Movies movies={movies}/>
        <PagingButton label="Prev Page" incr={-1}
        onClick={this.handlePageChange.bind(this)}
        />
        <PagingButton label="Next Page" incr={1}
        onClick={this.handlePageChange.bind(this)}
        />
      </div>
    );
  }
}

export default App;
