import React from 'react';
import PropTypes from 'prop-types';

MovieInfo.propTypes = {
  selectedMovie:PropTypes.object,
}

MoviePoster.propTypes = {
  selectedMovie:PropTypes.object,
}


export function MovieInfo({selectedMovie}) {
  let urlString = "http://www.imdb.com/title/"+selectedMovie.imdbID
  return (
  <div>
  <div className="movieInfo">
  <div className="row">
    <div>title:</div><div>{selectedMovie.Title}</div>
  </div>
  <div className="row">
    <div>release date:</div><div>{selectedMovie.Released}</div>
  </div>
  <div className="row">
    <div>rating:</div><div>{selectedMovie.Rated}</div>
  </div>
  <div className="row">
    <div>cast:</div><div>{selectedMovie.Actors}</div>
  </div>
  <div className="row">
    <div>directed by:</div><div>{selectedMovie.Director}</div>
  </div>
  <div className="row">
    <div>written by:</div><div>{selectedMovie.Writer}</div>
  </div>
  <div className="row">
    <div>country:</div><div>{selectedMovie.Country}</div>
  </div>
  <div className="row">
    <div>synopsis:</div><div>{selectedMovie.Plot}</div>
  </div>
  <div className="row" style={{textAlign:'center'}}>
    <a href={urlString} target="_blank" rel="noopener noreferrer" style={{color:'black'}}>
      click here for more info at imdb
      </a>
  </div>
  </div>
</div>
  );
}

export function MoviePoster({selectedMovie}) {
return (
<div className="moviePoster">
<img src={selectedMovie.Poster} alt={selectedMovie.Title}/>
</div>
);
}