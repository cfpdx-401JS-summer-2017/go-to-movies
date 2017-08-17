import React from 'react';

export function Movies({ movies }) {
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