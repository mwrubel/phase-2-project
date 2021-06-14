import React from "react";

const deleteData = (item) => {
  return fetch("http://localhost:3001/MyWatchListMovies/" + item, {
    method: "delete",
  }).then((response) => {
    response.json();
    window.location.reload();
  });
};

const Movie = ({ Movie, Type, Poster, Year, i, id }) => {
  return (
    <div>
      <h2>
        {i + 1}. {Movie}: ({Type}, {Year})<br></br>
        <img src={Poster} alt="" />
        <br></br>
        <button onClick={() => deleteData(id)}>Remove from my list</button>
      </h2>
    </div>
  );
};
export default Movie;
