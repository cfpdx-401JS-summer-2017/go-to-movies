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
    const imbdLink = `http://www.imdb.com/title/${movie.imdbID}`;
    return (
        <div>
            <span>{movie.Title}</span>
            <br/>
            <a href={imbdLink}><img src={movie.Poster} alt={movie.Title} /></a>
        </div>
    );
}
