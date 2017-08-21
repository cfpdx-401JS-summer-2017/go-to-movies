import React, { Component } from 'react';
import PropTypes from 'prop-types';
import logo from './scans_celtic_knot.svg';
import './css/index.css';
import { Search } from './components/Search';
import { Movies } from './components/Movies';
import { MovieInfo } from './components/MovieInfo';
import { MoviePoster } from './components/MovieInfo';

const API_KEY = process.env.REACT_APP_API_KEY;

class App extends Component {
  static propTypes = {
    page: PropTypes.number,
    loading: PropTypes.bool,
    value: PropTypes.string,
    movies: PropTypes.arrayOf(PropTypes.string),
    movie: PropTypes.object,
    searchTerm: PropTypes.string,
    handleSearch: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      movie: null,
      page: 1,
      loading: true,
      searchTerm: '',
      selectedMovieInfo: {},
      display: 'none',
      visibility: 'hidden',
      posterUrl: logo
    };

  }

  componentDidMount() {
    this.setState({ loading: false });
  }

  async getMovieInfo(target) {
    const titleData = await fetch(
      `http://www.omdbapi.com/?i=${target.target.id}&apikey=${API_KEY}`
    );
    let titleInfo = await titleData.json();
    this.setState({selectedMovieInfo: titleInfo});
    this.setState({display: 'block'})
    this.setState({visibility: 'visible'})
    this.setState({posterUrl: titleInfo.Poster})

  }

  async handleSearch(searchTerm) {
    if (!searchTerm) return;
    searchTerm = encodeURI(searchTerm);
    let moviesArray = [];
    // debounce - slow down requests
    for (let i = 0; i <= 5; i++) {
      const res = await fetch(
        `http://www.omdbapi.com/?s=${searchTerm}&apikey=${API_KEY}&type=movie&page=${i}`
      );
      let results = await res.json();
      if (results.Search) {
        moviesArray = moviesArray.concat(results.Search);
      }
    }
    this.setState({ movies: moviesArray });
  }

  handleClose() {
    this.setState({display: 'none'})
    this.setState({visibility: 'hidden'})

  }

  render() {
    if (this.state.loading) return <div>Loading...</div>;

    return (
      <div className="App">
      <div className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
        <h2>Movie Seeker</h2>
      </div>
      <div>
        <Search onSearch={searchTerm => this.handleSearch(searchTerm)} />
        <div style={{display: this.state.display, visibility: this.state.visibility, float: 'left', width: '100%'}} >
          <MovieInfo selectedMovie={this.state.selectedMovieInfo}/>
          <MoviePoster selectedMovie={this.state.selectedMovieInfo}/>
          <div style={{textAlign:'center'}}>
            <button className="btn" onClick={() => this.handleClose()}
              style={{marginTop:30}}>close info panel</button>
          </div>
        </div>
      <div onClick={( {target} ) => this.getMovieInfo({target})}>
        <Movies movies={this.state.movies} />
      </div>
      </div>
      </div>
    );
  }
}

export default App;
