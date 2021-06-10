import React, { Component } from 'react'
import { BrowserRouter, Link, Route, Switch, Redirect } from "react-router-dom" 
import HomePage from "./components/HomePage";
import Content from "./components/Page2";
import About from "./components/Page3";
import PageNotFound from "./components/PageNotFound";
import MyList from "./components/MyList";
import 'semantic-ui-css/semantic.min.css'

export default class App extends Component {
  constructor(props){
    super(props)

    this.state = {
      searchValue: "",
      movies: [],
      pageNum: 1,
      url: 'https://movie-database-imdb-alternative.p.rapidapi.com',
      watchListMovies: []
    }
  }
  
/*Increase page number */
    PageUp = () => {
      this.setState({
        pageNum: this.state.pageNum +1
      })
    }

/*Decrease page number */
    PageDown = () => {
      this.setState({
        pageNum: this.state.pageNum -1
      })
    }

/*updates search value */
    handleOnChange = e => {
      this.setState({ searchValue: e.target.value })
    };

/*searches api with value typed into search bar */
    handleSearch = () => {
     this.makeApiCall(this.state.searchValue)
      }

/*Fetch (GET) data based on page # */
      makeApiCall = () => {
        let searchUrl = `${this.state.url}/?s=${this.state.searchValue}&page=${this.state.pageNum}`
        console.log(searchUrl)
        const requiredObj = {
        method: "GET",
        headers: {
          "x-rapidapi-key": "7f0443b9aemsh3ffa391c8a958eep138b24jsn80600be739c4",
          "x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com"}}
       fetch(searchUrl, requiredObj)
          .then(response => {
            return response.json()
          })
          .then(data => {this.setState({ movies: data.Search })})
          //console.log(this.state.movies)
      }

  // POST request with a JSON body 
   postRequest = (title, year, type, poster) => {
   fetch("http://localhost:3001/MyWatchListMovies", {
      method: 'POST',
      headers : {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({   
         'Movie': title,
         'Year': year,
         'Type': type,
         'Poster': poster
        })
})
  }

  render() {
      
    return (
    
/*Links */
      <BrowserRouter>
      
      <div>
         <ul className='myLinks'>
        <li>
            <Link to='/'>Home</Link>
        </li>
        <li>
            <Link to='/About'>About</Link>
        </li>
        <li>
            <Link to='/Content'>Most Popular Movies</Link>
        </li>
        <li>
          <Link to='/MyList'>My List</Link>
        </li>
        </ul>
      
        <Switch>

          <Route exact path='/' component={HomePage}> {/*Home page*/} <div>
            <h1 style={{fontSize: 45}}>Find a flick app</h1>

{/*Check if page num > 1 if it is display prev page button */}
            {this.state.pageNum > 1 &&
          <button onClick={ this.PageDown }>Previous Page</button> }

{/*Page up button (always shown) */}
          <button onClick={ this.PageUp }>Next Page</button>

          <h3>Page {this.state.pageNum}</h3>

{/*Search bar, update searchValue with what user types in */}
        <input name="text" 
        type="text" 
        placeholder="Search Movies!" 
        onChange={event => this.handleOnChange(event)}
        value={this.state.searchValue}
        />
        
        <button onClick={this.handleSearch}>Search</button>

{/*display API data */}
{this.state.movies ? (
  <div id="movies-container">
    {this.state.movies.map((movie, index) => (
      <div className="single-movie" key={index}>
        <h2>{index+=1}. {movie.Title}: ({movie.Type}, {movie.Year})</h2>
        <img src={movie.Poster} alt=''/>

        <br></br>
        
{/*Button to POST data<h1><button onClick={this.postRequest(movie)}></button></h1>*/}
<h1><button onClick={() => this.postRequest(movie.Title, movie.Year, movie.Type, movie.Poster)}>Add to list</button></h1>
        {/*this.state.watchListMovies.push(this.state.movies[index])*/}   

      </div>
    ))}
  </div>
) : (
  <p></p>
)}
        </div><HomePage /> </Route>
          <Route exact path='/About' component={About}> {/*About page*/} <About /></Route>
          <Route exact path='/Content' component={Content}> {/*Content page*/} <Content /> </Route>
          <Route exact path='/MyList' component={MyList}> <h1>MY LIST!!</h1> {/*My List Page*/} <MyList/> </Route>
          <Route exact path='/PageNotFound' component={PageNotFound} />
          <Redirect to="/PageNotFound"/>

        </Switch>
        
      </div>
      
      </BrowserRouter>
      
    )
  }
}