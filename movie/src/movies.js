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
        <img src={movie.Poster} style={{width:100}} alt={movie.Title} />
      </td>
      <td>
        <table>
          <tbody>
            <tr><td>{movie.Title}</td></tr>
            <tr><td>{movie.Year}</td></tr>
            <tr><td><a href={`http://www.omdbapi.com/?apikey=${API_KEY}&i=${movie.imdbID}&r=json`}>Read Plot Summary...</a></td></tr>
          </tbody>
        </table>
      </td>
    </tr>
  );
}
