import React from 'react'

//import App from 'App'

const RenderMovies = (TheMovies) => {
    return (

<div>
  <div id="MyWatchListMovies">
    {TheMovies.map((movie, index) => (
      <div className="Movie" key={index}>
        <h2>{movie.Title}: ({movie.Type}, {movie.Year})</h2>
        <img src={movie.Poster} alt=''/>
        <br></br>
      </div>
    ))}
  </div>
 : (
  <p></p>
  </div>
)}

export default RenderMovies