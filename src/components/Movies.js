import React from 'react';

export function Movies({ loading, movies }) {
    
    if(!movies) return (
        <div>
            <h2>Welcome to Let's Go To The Movies</h2>
            <p>Begin by searching a movie title.</p>
        </div>
    );
    
    if(loading) return <div id="loading">Loading...</div>;

    return (
        <ul>
            {movies.map(movie => (
                <li key={movie.imdbID}>
                    <Movie movie={movie} />
                </li>
            ))}
        </ul>
    );
}

export function Movie({ movie }) {
    return (
        <div>
            <h2>{movie.Title}</h2>
            <img src={movie.Poster} style={{ width: 100 }} />
        </div>
    );
}