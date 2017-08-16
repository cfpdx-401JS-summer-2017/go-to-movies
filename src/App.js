import React, { Component } from 'react';
import './App.css';
import { Movies } from './movies/Movies';

const API_KEY = process.env.REACT_APP_API_KEY;

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            movies: [],
            page: 1,
            loading: false,
            title: ''
        };
    }


    handleChange(event) {
        console.log('changed');
        this.setState({
            title: event.target.value
        });
    }

    handleSubmit(event) {
        console.log('submitted was', this.state.title);
        this.fetchMovies(this.state.page, this.state.title);
        event.preventDefault();
    }

    fetchMovies(page, title) {
        console.log('title is',{title});
        this.setState({
            loading: true,
            movies: []
        });

        fetch(`http://www.omdbapi.com/?s=${encodeURI(title)}&plot=short&r=json&page=${page}&apikey=${API_KEY}`)
            .then(res => res.json())
            .then(data => data.Search)
            .then(movies => {
                console.log('movies are', movies);
                if(movies) {
                    this.setState({
                        movies,
                        loading: false
                    });
                }
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
            <div className="frame">
                <div>
                    <div>
                        <h1>Let's go to the movies!</h1>
                        <form onSubmit={this.handleSubmit.bind(this)}>
                            <label>
                                Search by Title:
                                <input type="text" name="title" style={{ width: '300px' }} value={this.state.title} onChange={this.handleChange.bind(this)} />
                            </label>
                            <input type="submit" value="Submit" />
                        </form>
                    </div>
                    <div>
                        <PagingButton disabled={movies.length === 0} label="Prev Page" incr={-1} onClick={this.handlePageChange.bind(this)} />
                        <PagingButton disabled={movies.length === 0} label="Next Page" incr={1} onClick={this.handlePageChange.bind(this)} />
                    </div>
                    <Movies movies={movies} />
                </div>
            </div>
        );
    }
}

function PagingButton({ onClick, incr, label, disabled }) {
    return (
        <button disabled={disabled} onClick={() => onClick(incr)}>
            {label}
        </button>
    );
}

export default App;
