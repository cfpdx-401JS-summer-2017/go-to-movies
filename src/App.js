import React, { Component } from 'react';
import './App.css';
import { Movies } from './movies/Movies';
import { Search } from './search/Search';

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

  componentDidMount() {
    this.fetchMovies(this.state.page)
  }

  fetchMovies(searchQuery) {
    this.setState({
      movies: []
    });

    fetch(`http://www.omdbapi.com/?s=${searchQuery}&plot=short&r=json&apikey=${API_KEY}`)
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
    if(loading) return <div id="loading">Loading...</div>;

    return(
      <div id="wrap">
        <div id="search">
          <div>{this.state.search}</div>
          <Search onSearch={(search) => this.setState({ search })}/>
        </div>
        <div id="content">
          <div id="pagination">
            <PagingButton label="Prev Page" incr={-1}
            onClick={this.handlePageChange.bind(this)}
            / >
            <PagingButton label="Next Page" incr={1}
            onClick={this.handlePageChange.bind(this)}
            / >
          </div>
          <Movies movies={movies} />
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