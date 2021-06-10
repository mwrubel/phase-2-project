import React, { Component } from 'react'

export default class MyList extends Component {

  state = {
    myMovies: []
}

//get data from my json, set myMovies = the json data
  componentDidMount() {
    const requiredObj = {
    method: "GET"}
   fetch('http://localhost:3001/MyWatchListMovies', requiredObj)
      .then(response => {
        return response.json()
      })
      .then(data => {
        this.setState({ myMovies: data })})
   }
    render(){
    return (
      <div className='Mapped-List'>

{/*Map and display all the json data*/}        
        {
        this.state.myMovies && this.state.myMovies.length>0 ? this.state.myMovies.map((movie, i)=>
        <h2>{i+=1}. {movie.Movie}: ({movie.Type}, {movie.Year})
        <br></br><img src={movie.Poster} alt=''/></h2>)


    : <h1>Nothing to see here! You didn't add any movies yet!!!</h1>    
    }
{/*If theres no JSON data display message: */}
      </div>
    )
}
}