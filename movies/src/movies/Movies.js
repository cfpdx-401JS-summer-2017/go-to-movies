import React from 'react';


export function Movies({ movies }){
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

export function Movie({ movie }){
    return (
        <div>
            <span>{ movie.Title } </span>
        </div>
    );
}

