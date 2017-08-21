import React from 'react';

export function Movies({ movie }) {
  
  return (
    <ul>
      {movie}
    </ul>
  );
}

export function Movie({ movie }) {
  console.log(movie)
  if(movie.Response == "False") return <div> </div>
  return (
    <div>
        <span>{movie.Title} Earned:</span>
        <span>{movie.BoxOffice}</span>
        <img src={movie.Poster} style={{ width: 100 }}/>
    </div>
  );
}