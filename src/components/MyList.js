import React, { Component } from 'react'
//import App from 'App'

export default class MyList extends Component {

  state = {
    myMovies: []
}

  componentDidMount() {
    const requiredObj = {
    method: "GET"}
   fetch('http://localhost:3001/MyWatchListMovies', requiredObj)
      .then(response => {
        return response.json()
      })
      .then(data => {
        this.setState({ myMovies: data })})
      //.then(data=> console.log(data))
   }
    render(){
    return (
      <div className='Mapped-List'>
        
        {
        this.state.myMovies && this.state.myMovies.length>0 && this.state.myMovies.map((movie, i)=>
        <h2>{i+=1}. {movie.Movie}: ({movie.Type}, {movie.Year})
        <br></br><img src={movie.Poster} alt=''/></h2>)
        }
    
      </div>
    )
}
 
}
//export default RenderMovies