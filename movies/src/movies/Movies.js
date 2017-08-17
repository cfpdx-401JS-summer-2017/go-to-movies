import React from 'react';


export function Movies({ movies, search }){
    if (!movies && !search) return <div></div>;
    else if (!movies) return <div> Not Found </div>;
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

export function Movie({ movie }){
    return (
        <div>
            <span>{ movie.Title } </span>
            <p>Released: {movie.Year}</p>
            <img alt = "movie poster" src={movie.Poster} style={{width: 200}}/>
        </div>
    );
}

