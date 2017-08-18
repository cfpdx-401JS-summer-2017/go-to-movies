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
          <Movie movie={movie} />
        </div>
      )}
    </div>
  );
}

export function Movie({ movie }) {
  return (
      <div className="movieItem movieInfo">
        {movie.Title} - {movie.Year}
        <div className="movieInfo">
        <img src={movie.Poster} style={{width: 100}}/>
      </div>
      </div>
  );
}


