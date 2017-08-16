import React from 'react';

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
  console.log('imdbID', movie.imdbID);
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
            <tr><td><a href="">Read Plot Summary...</a></td></tr>
          </tbody>
        </table>
      </td>
    </tr>
  );
}
