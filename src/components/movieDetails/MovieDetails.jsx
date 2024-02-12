import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './MovieDetails.module.css';
import { Outlet } from 'react-router-dom';

const apiKey = '47654636e0a81733a8194af924ebd404';

function MovieDetails() {
  const { movieId } = useParams();
  console.log(movieId);

  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`
        );
        setMovieDetails(response.data);
      } catch (error) {
        console.error('Failed to fetch movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (!movieDetails) return <div>Loading...</div>;

  return (
    <div className={styles.movieDetails}>
      <div className={styles.movieDetailsTitle}></div>

      <div className={styles.movieDetailsContent}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
          alt={movieDetails.title}
        />
        <div className={styles.movieDetailsText}>
          <h1>
            {movieDetails.title} (
            {new Date(movieDetails.release_date).getFullYear()})
          </h1>
          <p>
            <span style={{ fontWeight: 'bold' }}>User score:</span>{' '}
            {Math.round(movieDetails.vote_average * 10)}%
          </p>
          <p>
            <span style={{ fontWeight: 'bold' }}>Overview:</span>{' '}
            {movieDetails.overview}
          </p>
          <p>
            <span style={{ fontWeight: 'bold' }}>Genres:</span>{' '}
            {movieDetails.genres.map(genre => genre.name).join(', ')}
          </p>
        </div>
      </div>

      <div className={styles.additionalInfo}>
        <h2>Additional Information</h2>
        <ul>
          <li>
            <Link to={`/movies/${movieId}/cast`} className={styles.links}>
              Cast
            </Link>
          </li>
          <li>
            <Link to={`/movies/${movieId}/reviews`} className={styles.links}>
              Reviews
            </Link>
          </li>
        </ul>
      </div>
      <Outlet />
    </div>
  );
}

MovieDetails.propTypes = {
  //   movieId: PropTypes.string.isRequired,
  movieDetails: PropTypes.object,
};

export default MovieDetails;
