import React from 'react';

export function Movies({ movies, onSelect }) {
    

    if(movies)

    return (

        <ul>
            {movies.map( movie => (
                <li key={movie.imdbID}>
                    <SmallMovie movie={movie} onSelect={onSelect}/>
                </li>
            ))}
        </ul>

    );

}

export function SmallMovie({ movie, onSelect }) {

    return (

        <div onClick={ e => {
            e.preventDefault();
            onSelect(e.target.id);
            }}>
            <img id={movie.imdbID} src={movie.Poster} style={{ width: 100 }} alt={movie.Title}/>
            <span>{movie.Title}</span>
        </div>

    );

}

export function BigMovie({movie}) {

    return (
        <div>
            <img src={ movie.Poster } style={{ width: 300 }} alt={movie.Title}/>
        </div>


    )
}
