import React from 'react';


export function Movies({ movies, search }){
    if (!movies && !search) return <div> Search for a Movie </div>;
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
            <img src={movie.Poster} style={{width: 100}}/>
        </div>
    );
}

