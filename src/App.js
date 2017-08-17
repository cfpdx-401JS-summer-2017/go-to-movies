import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const API_KEY = process.env.REACT_APP_API_KEY;
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: null,
      title: '',
      loading: true
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(target) {
    this.setState({
      title: target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault()
    console.log(this.state.title);
    this.fetchMovies(this.state.title);
  }
  componentDidMount() {
    this.fetchMovies(this.state.title);
  }
  fetchMovies(title) {
    // const title = '';
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
    if(loading) return <div>Loading...</div>;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" placeholder="Search..." value={this.state.title} 
          onChange={({ target }) => this.handleChange(target)}/>
          <input type="submit" value="Submit"/>
        </form>
      </div>
    )
  }
}

export default App;
