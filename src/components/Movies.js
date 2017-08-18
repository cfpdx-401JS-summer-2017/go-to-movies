import React from 'react';

export function Movies({ loading, movies, search }) {
    
    if(!movies && !search) return (
        <div>
            <h2>Welcome to Let's Go To The Movies</h2>
            <p>Begin by searching a movie title.</p>
        </div>
    );

    if(!movies) return (
        <div>
            <h2>{`No results found for ${search}`}</h2>
            <p>Please try searching another title.</p>
        </div>
    );
    
    if(loading) return <div id="loading">Loading...</div>;

    return (
        <div>
            <h2>{`Search results for “${search}”`}</h2>
            <ul>
                {movies.map(movie => (
                    <li key={movie.imdbID}>
                        <Movie movie={movie} />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export function Movie({ movie }) {
    return (
        <div>
            <h3>{movie.Title}</h3>
            <img src={movie.Poster} style={{ width: 100 }} />
        </div>
    );
}