import React, { Component } from 'react';
import fetch from '../fetch/fetch';
import { NavLink, Route } from 'react-router-dom';
import Cast from '../Components/Cast';
import Reviews from '../Components/Reviews';
import routes from '../routes';
import './Details.css';

class MovieDetailsPage extends Component {
  state = {
    movieId: '',
    poster: null,
    title: '',
    userScore: null,
    overview: '',
    genres: [],
    cast: [],
    reviews: [],
  };

  async componentDidMount() {
    const { movieId } = this.props.match.params;
    this.setState({ movieId });
    const data = await fetch.getMovieById(movieId);
    const { title, overview, genres, poster_path, vote_average } = data;
    this.setState({
      poster: poster_path,
      title,
      userScore: vote_average,
      overview,
      genres,
    });
    try {
      const cast = await fetch.getCastDetails(movieId);
      this.setState({
        cast: cast.map(({ cast_id, name, character, profile_path }) => ({
          name,
          character,
          photo: profile_path,
          id: cast_id,
        })),
      });
    } catch (error) {
      console.log(error);
    }

    try {
      const reviews = await fetch.getReviewsDetails(movieId);
      this.setState({
        reviews: reviews.map(({ author, id, content }) => ({
          author,
          id,
          text: content,
        })),
      });
      this.state.reviews.map(rev => {
        console.log(typeof rev.text);
      });
    } catch (error) {
      console.log(error);
    }
  }

  handleExit = () => {
    const { state } = this.props.location;
    let from;
    if (state && state.from) {
      const { pathname, search } = state.from;
      from = pathname + search;
    } else {
      from = routes.home;
    }
    this.props.history.push(from);
  };

  render() {
    const { poster, title, userScore, overview, genres, cast, reviews } =
      this.state;
    const { match } = this.props;
    return (
      <div className="detailsContainer">
        <button
          className="returnButton"
          type="button"
          onClick={this.handleExit}
        >
          Return
        </button>
        <div className="detailsBox">
          <div className="posterBox">
            {poster && (
              <img
                src={`https://image.tmdb.org/t/p/w300${poster}`}
                alt={title}
              />
            )}
          </div>
          <div>
            <h1 className="detailsTitle">{title}</h1>
            <p className="detailsText">
              <span className="detailsAccent">User score: </span>
              {userScore}
            </p>
            <h2 className="detailsSubtitle">Overview</h2>
            <p className="detailsText">{overview}</p>
            <h2 className="detailsSubtitle">Genres</h2>
            <ul className="GenresList">
              {genres.map(({ name }) => (
                <li className="genreItem" key={name}>
                  <p className="genreName">{name}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div>
          <NavLink
            className="navLink"
            activeClassName="navLinkActive"
            to={{
              pathname: `${match.url}/cast`,
              state: {
                from: {
                  ...this.props.location.state.from,
                },
              },
            }}
          >
            <p className="additionalDetailsText">Cast</p>
          </NavLink>
          <NavLink
            className="navLink"
            activeClassName="navLinkActive"
            to={{
              pathname: `${match.url}/reviews`,
              state: {
                from: {
                  ...this.props.location.state.from,
                },
              },
            }}
          >
            <p className="additionalDetailsText">Reviews</p>
          </NavLink>
        </div>
        <Route
          path={`${match.path}/cast`}
          render={props => <Cast {...props} cast={cast} />}
        />
        <Route
          path={`${match.path}/reviews`}
          render={props => <Reviews {...props} reviews={reviews} />}
        />
      </div>
    );
  }
}

export default MovieDetailsPage;
