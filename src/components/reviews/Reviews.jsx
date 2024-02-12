import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './Reviews.module.css';

const apiKey = '47654636e0a81733a8194af924ebd404'; // Înlocuiește cu cheia ta API

function Reviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${apiKey}`
        );
        setReviews(response.data.results);
      } catch (error) {
        console.error('Failed to fetch reviews:', error);
      }
    };

    fetchReviews();
  }, [movieId]);

  if (reviews.length === 0) return <div>No reviews found.</div>;

  return (
    <div className={styles.reviewsList}>
      {reviews.map(review => (
        <div key={review.id} className={styles.reviewItem}>
          <h3>{review.author}</h3>
          <p>{review.content}</p>
        </div>
      ))}
    </div>
  );
}

Reviews.propTypes = {
  //   movieId: PropTypes.string.isRequired,
  reviews: PropTypes.array,
};

export default Reviews;
