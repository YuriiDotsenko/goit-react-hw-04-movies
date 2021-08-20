import React from 'react';
import PropTypes from 'prop-types';
import './Cast.css';

import defPhoto from './../../photo.jpeg';

const Cast = ({ cast }) => {
  return (
    <ul className="castList">
      {cast.map(({ character, id, name, photo }) => (
        <li className="castItem" key={id}>
          <div>
            <div>
              {photo && (
                <img
                  alt={name}
                  src={`https://image.tmdb.org/t/p/w200${photo}`}
                />
              )}
            </div>
            <p className="castText">Name: {name}</p>
            <p className="castText">Character: {character}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

Cast.defaultProps = {
  cast: { photo: defPhoto },
};

Cast.propTypes = {
  cast: PropTypes.arrayOf(
    PropTypes.exact({
      character: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,

      photo: PropTypes.string,
    }),
  ),
};

export default Cast;
