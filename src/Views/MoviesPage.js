import React, { Component } from 'react';
import fetch from '../fetch/fetch';
import MoviesList from '../Components/MoviesList';
import queryString from 'query-string';
import './Movies.css';

class MoviesPage extends Component {
  state = {
    query: '',
    movies: [],
  };
  async componentDidMount() {
    const parsed = queryString.parse(window.location.search);

    if (parsed.query) {
      const results = await fetch.getMovieByTitle(parsed.query);

      this.setState({
        query: '',
        movies: results.map(({ title, id }) => ({ title, id })),
      });
    }
  }

  handleInput = event => {
    this.setState({ query: event.target.value });
  };
  handleSearch = async () => {
    try {
      this.props.match.params.query = this.state.query;
      this.props.history.push(`/movies?query=${this.props.match.params.query}`);
      const results = await fetch.getMovieByTitle(
        this.props.match.params.query,
      );

      this.setState({
        query: '',
        movies: results.map(({ title, id }) => ({ title, id })),
      });
    } catch (error) {
      console.log(error.response.data.errors);
    }
  };

  render() {
    const { query, movies } = this.state;
    return (
      <div className="moviesBox">
        <div className="miviesInput">
          <input
            autoFocus
            className="movieInput"
            placeholder="What are you looking for?"
            value={query}
            type="text"
            autoComplete="off"
            onChange={this.handleInput}
          />
          <button
            className="searchButton"
            type="button"
            onClick={this.handleSearch}
          >
            Search
          </button>
        </div>

        <MoviesList movies={movies} />
      </div>
    );
  }
}

export default MoviesPage;
