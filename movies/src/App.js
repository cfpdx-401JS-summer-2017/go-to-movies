import React, { Component } from 'react';
import './App.css';

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

    componentDidMount(){
        this.fetchMovies(this.state.page);
    }

    fetchMovies(page){
        this.setState({
            movies: []
        });

        fetch(`http://www.omdbapi.com/?s=Bro&plot=short&r=json&page=${page}&apikey=${API_KEY}`)
            .then(res => res.json())
            .then(data => {
                console.log('data is', data.Response);
                if(!data.Response) return 'Movies not found';
                else return data.Search;
            })
            .then(movies => {
                this.setState({
                    movies,
                    loading: false
                });
            });
    }

    handlePageChange(incr){
        const page = Math.max(1, this.state.page + incr);
        console.log('page is', page);
        this.setState({page});
        this.fetchMovies(page);
    }

    render() {
        const { loading, movies } = this.state;
        if(loading) return <div> Loading... </div>;

        return (
            <div className="App">
                <PagingButton label="Prev Page" incr={-1}
                    onClick={this.handlePageChange.bind(this)}
                />
                <PagingButton label="Next Page" incr={1}
                    onClick={this.handlePageChange.bind(this)}
                />
                <Movies movies={ movies }/>
            </div>
        );
    }
}

function PagingButton({onClick, incr, label}){
    return (
        <button onClick = {() => onClick(incr)}>
            {label}
        </button>
    );
}

function Movies({ movies }){
    if (!movies) return <div> Not found </div>;
    else {
        return (
            <ul>
                {movies.map(movie => (
                    <li key = {movie.imdbID}>
                        <Movie movie={ movie }/>
                    </li>
                ))}
            </ul>
        );
    }
}

function Movie({ movie }){
    return (
        <div>
            <span>{ movie.Title } </span>
        </div>
    );
}

export default App;
