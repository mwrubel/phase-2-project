import React, { Component } from "react";
import Movie from "./Movie";

export default class MyList extends Component {
  state = {
    myMovies: [],
    theId: 1,
  };

  //get data from my json, set myMovies = the json data
  componentDidMount() {
    const requiredObj = {
      method: "GET",
    };
    fetch("http://localhost:3001/MyWatchListMovies", requiredObj)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({ myMovies: data, theId: data.id });
      });
  }
  render() {
    return (
      <div className="Mapped-List">
        {/*Map and display all the json data*/}
        {this.state.myMovies && this.state.myMovies.length > 0 ? (
          this.state.myMovies.map((movie, i) => (
            <Movie {...movie} i={i} {...this.state.theId}></Movie>
          ))
        ) : (
          <h1>Nothing to see here! Add some movies!!!</h1>
        )}
        {/*If theres no JSON data display above message: */}
      </div>
    );
  }
}
