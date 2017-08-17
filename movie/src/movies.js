import React from 'react';
const API_KEY = process.env.REACT_APP_API_KEY;

// create table of all movies
export function Movies({ movies }) {
  return (
    <table>
      <tbody>
        {movies.map(movie => (
          <Movie movie={movie} key={movie.imdbID} />
        ))}
      </tbody>
    </table>

  );
}

// create row for individual movie
export function Movie({ movie }) {
  // console.log('imdbID', movie.imdbID);
  return (
    <tr>
      <td>
        <a href={`http://www.omdbapi.com/?apikey=${API_KEY}&i=${movie.imdbID}&r=json`}>
          <img src={movie.Poster} style={{width:100}} alt={movie.Title} />
        </a>
      </td>
      <td>
        {movie.Title} ({movie.Year})
      </td>
    </tr>
  );
}
