import React from 'react';
import PropTypes from 'prop-types';

Movie.propTypes = {
  movie: PropTypes.object
};

Movies.propTypes = {
  movies: PropTypes.array
};

export function Movies({ movies }) {
  return (
    <div className="movieList">
      {movies.map(movie =>
        <div key={movie.imdbID}>
          <Movie movie={movie}  />
        </div>
      )}
    </div>
  );
}

export function Movie({ movie }) {
  return (
    <div>
      {<div className="movieItem" id={movie.imdbID}>
        {movie.Title} - {movie.Year}
      </div>}
    </div>
  );
}
