import React from 'react'

import App from '../App'
//import db from "./containers/db.json"
const RenderMovies = (addedMovie) => {
    let movie = addedMovie.title
    return (
        <h1>My favorite movies!!!
        <div>{movie}{/*this.props.state.watchListMovies*/}</div>
        </h1>
    )
}
export default RenderMovies