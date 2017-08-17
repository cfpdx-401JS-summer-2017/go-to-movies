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
    const posterLink = movie.Poster === 'N/A' ? 'missing-poster.png' : movie.Poster;
    return (
        <div>
            <span>{movie.Title}</span>
            <br/>
            <a href={imbdLink}><img src={posterLink} alt={movie.Title} /></a>
        </div>
    );
}
