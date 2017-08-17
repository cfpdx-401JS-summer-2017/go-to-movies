import React, { Component } from 'react';
import './App.css';
import { Movies } from './components/Movies';
import { Search } from './components/Search';

const API_KEY = process.env.REACT_APP_API_KEY;

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      movies: null,
      page: 1,
      loading: true,
      search: ''
    };

  }

  handleQuerySumbit(query) {
    const searchQuery = query.search.split(' ').join('+');
    this.setState({
      search: searchQuery
    });
    this.fetchMovies(searchQuery, 1);
  }

  fetchMovies(searchQuery, page) {
    this.setState({
      movies: []
    });

    fetch(`http://www.omdbapi.com/?s=${searchQuery}&r=json&page=${page}&apikey=${API_KEY}`)
      .then(res => res.json())
      .then(data => data.Search)
      .then(movies => {
        console.log('movies', movies);
        this.setState({
          movies,
          loading: false
        });
      });
  }

  handlePageChange(incr) {
    const page = Math.max(1, this.state.page + incr);
    const searchQuery = this.state.search;
    console.log('page', page);
    console.log('searchQuery', searchQuery);
    this.setState({ page });
    this.fetchMovies(searchQuery, page);
  }

  render() {
    
    const { loading, movies, search } = this.state;
    
    return(
      <div id="wrap">
        <div id="search">
          <Search onSearch={(search) => this.handleQuerySumbit({ search })}/>
        </div>
        <div id="content">
          {this.state.movies &&
            <div id="pagination">
              <PagingButton label="&laquo; Prev Page" incr={-1}
              onClick={this.handlePageChange.bind(this)}
              / >
              <PagingButton label="Next Page &raquo;" incr={1}
              onClick={this.handlePageChange.bind(this)}
              / >
            </div>
          }
          <Movies loading={loading} movies={movies} search={search} />
        </div>
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