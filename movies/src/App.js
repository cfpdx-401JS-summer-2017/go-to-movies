import React, { Component } from 'react';
import './App.css';
import { Movies } from './movies/Movies';

const API_KEY = process.env.REACT_APP_API_KEY;


class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            movies: null,
            page: 1,
            search: '',
            loading: true
        };
    }

    componentDidMount() {
        this.fetchMovies(this.state.page, this.state.search);
    }

    fetchMovies(page, search) {
        this.setState({
            movies: []
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
        this.fetchMovies(page, this.state.search);
    }

    handleSearch(search){
        this.setState({ search });
        this.fetchMovies(1, search);
    }

    render() {
        const header = <h1> Let's Go to the Movies </h1>
        const { loading, movies, search } = this.state;
        if (loading) return <div> Loading... </div>;

        return (
            <div className="App">
            <div>
                {header}
            </div>
            <div>
                {this.state.search}
            </div>
                <SearchButton onSearch={this.handleSearch.bind(this)}/>
            <div className="Movies">
                <PagingButton label="Prev Page" incr={-1}
                    onClick={this.handlePageChange.bind(this)}
                />
                <PagingButton label="Next Page" incr={1}
                    onClick={this.handlePageChange.bind(this)}
                />
                <Movies movies={movies} search={search} />
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

function SearchButton({ onSearch }){
    return(
        <form onSubmit = { e => {
            e.preventDefault();
            const form = e.target;
            console.log(form);
            onSearch(form.elements.search.value);
        }}>
        <input name="search"/>
        <button type="submit">Submit</button>
        </form>
    );
}

export default App;
