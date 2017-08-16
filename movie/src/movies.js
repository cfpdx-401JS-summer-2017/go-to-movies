import React from 'react';

// create list of all movies
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

// create list item for individual movie
export function Movie({ movie }) {
  return (
    <div>
      <span>{movie.title}</span>
      <img src={movie.Poster} style={{width:100}} alt={movie.Title} />
    </div>
  );
}
