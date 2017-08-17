import React from 'react';

export function Movies({ movies }) {
  return (
    <table>
      <tbody>

        {movies.map(movie =>
          <Movie movie={movie} key={movie.imdbID} />
        )}

      </tbody>
    </table>

  );
}

export function Movie({ movie }) {
  console.log('adding movie to page', movie);

  return (
    <tr>
      <td>
        <img src={movie.Poster} style={{width:100}} alt={movie.Title} />
      </td>
      <td className="border-row">
        <table>
          <tbody>
            <tr><td>{movie.Title} ({movie.Year})</td></tr>
            <tr><td>Rated {movie.Rated}</td></tr>
            <tr><td>{movie.Genre}</td></tr>
            <tr><td>{movie.Plot}</td></tr>
          </tbody>
        </table>
      </td>
    </tr>
  );
}
