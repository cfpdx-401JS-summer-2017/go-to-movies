import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const API_KEY = process.env.React_APP_API_KEY;
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: null,
      title: null,
      loading: true
    };
  }
  componentDidMount() {
    this.fetchMovies(this.state.title);
  }
  fetchMovies(title) {
    const title = '';
    this.setState({
      movies:[]
    });

  fetch(`http://www.omdbapi.com/?t=${encodeURI(title)}&plot=full&apikey=${API_KEY}`)
    .then(res => res.json())
    .then(data => data.Search)
    .then(movies => {
      this.setState({
        movies,
        loading: false
      });
    });
  }

  render() {
    const { loading, movies } = this.state;
    if(loading) return <div>Loading...</div>
  }
}

export default App;
