import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Movies} from './movies/Movies';

const API_KEY = process.env.REACT_APP_API_KEY;
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: null,
      title: '',
      page: 1, 
      // poster: " ",
      // search: search,
      loading: true
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleChange(target) {
    this.setState({
      title: target.value
    });
  }

  handlePageChange(incr) {
    const page = Math.max(1, this.state.page + incr);
    this.setState({ page });
    this.fetchMovies(this.state.title, page);
  }
  handleInputChange(event) {
    this.setState({title:event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault()
    console.log(this.state.title);
    this.fetchMovies(this.state.title);
  }
  componentDidMount() {
    this.fetchMovies(this.state.title, this.state.page);
  }
  fetchMovies(title, page) {
    // const title: 'St';
    this.setState({
      movies:[]
    });
console.log(encodeURI(title));
  fetch(`http://www.omdbapi.com/?s=${encodeURI(title)}&plot=full&page=${page}&apikey=${API_KEY}`)
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

    if( loading ) return <div>Loading...</div>;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" placeholder="Search..." value={this.state.title} onChange={({target}) => this.handleChange(target)}/>
          <input type="submit" value="Submit"/>
        </form>
        <div>
        <PagingButton label="Prev Page" incr={-1} 
          onClick={this.handlePageChange.bind(this)}
        />
        <PagingButton label="Next Page" incr={1} 
          onClick={this.handlePageChange.bind(this)}
        />
        <Movies movies={movies}/>
        </div>
      </div>
    )
  }
}

function PagingButton({ onClick, incr, label }) {
  return (
    <button onClick={() => onClick(incr)}>
      {label}
    </button>
  );
}

function SubmitForm({onclick, value}) {
  return (
    <button>
    {value}
    </button>
  )
}
  
export default App;
