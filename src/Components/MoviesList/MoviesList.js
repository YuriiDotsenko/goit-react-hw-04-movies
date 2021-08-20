import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import './MoviesList.css';

const MoviesList = ({ movies, location }) => {
  return (
    movies.length > 0 && (
      <ul className="MoviesList">
        {movies.map(({ title, id }) => (
          <li className="movieItem" key={id}>
            <Link
              className="movieLink"
              to={{
                pathname: `/movies/${id}`,
                state: { from: location },
              }}
            >
              <p className="movieTitle">{title}</p>
            </Link>
          </li>
        ))}
      </ul>
    )
  );
};

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.exact({
      title: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    }),
  ),
};

export default withRouter(MoviesList);
