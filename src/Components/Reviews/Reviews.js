import React from 'react';
import PropTypes from 'prop-types';
// import './Reviews.scss';

const Reviews = ({ reviews }) => {
  return reviews.length > 0 ? (
    <ul className="reviewsList">
      {reviews.map(({ author, id, text }) => (
        <li className="reviewItem" key={id}>
          <h2 className="reviewAuthor">{author}</h2>
          <p className="reviewText">{text}</p>
        </li>
      ))}
    </ul>
  ) : (
    <p>No reviews available yet</p>
  );
};

Reviews.propTypes = {
  reviews: PropTypes.arrayOf(
    PropTypes.exact({
      author: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      test: PropTypes.string.isRequired,
    }),
  ),
};

export default Reviews;
