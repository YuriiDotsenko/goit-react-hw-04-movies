import React, { Component } from 'react';
import MoviesList from '../Components/MoviesList';
import fetch from '../fetch/fetch';
import './Home.css';

class HomePage extends Component {
  state = {
    movies: [],
  };

  async componentDidMount() {
    const results = await fetch.getPopularMovies();
    // console.log(results);
    this.setState({ movies: results.map(({ title, id }) => ({ title, id })) });
  }

  render() {
    const { movies } = this.state;
    return (
      <>
        <h1 className="HomeTitle">Trending movies today:</h1>
        <MoviesList movies={movies} />
      </>
    );
  }
}

export default HomePage;
