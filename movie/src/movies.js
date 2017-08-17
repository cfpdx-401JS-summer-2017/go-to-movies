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
      <td className="border-row">
        <table>
          <tbody>
            <tr><td>{movie.Title} ({movie.Year})</td></tr>
            <tr><td>Rating goes here</td></tr>
            <tr><td>Plot goes here Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</td></tr>
          </tbody>
        </table>
      </td>
    </tr>
  );
}
