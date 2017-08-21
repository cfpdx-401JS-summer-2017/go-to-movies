import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Movies } from './movies/Movies';
import { Search } from './Search';

const API_KEY = process.env.REACT_APP_API_KEY;

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      search: 'aa',
      loading: true
    };
  }

  componentDidMount() {
    this.fetchMovies(this.state.search);
  }

  fetchMovies(search) {
    this.setState({
      movies: [],
      loading: true,
      search
    });

    fetch(`http://www.omdbapi.com/?s=${search}&plot=short&r=json&apikey=${API_KEY}`)
      .then(res => res.json())
      .then(data => data.Search)
      .then(movies => {
        if(!movies)
            return this.setState({
              movies: [{
                imdbID: '123',
                Title: 'No search results. Please try another search term',
                Poster: logo
              }],
              loading: false
            })
        this.setState({
          movies,

          loading: false
        });
      });
  }

  render() {
    const { loading, movies } = this.state;
    if (loading) return <div>
      <img src={logo} alt="Loading.." style={{
        position: 'absolute',
        top: '50 %',
        left: '50 %',
        width: '100px',
        height: '100px',
      }}></img>
    </div >;


    return (
      <div>
        <div>{this.state.search}</div>
        <Search onSearch={(search) => this.fetchMovies(search)}
        />
        <Movies movies={movies} />
      </div>
    );
  }
}

export default App;

