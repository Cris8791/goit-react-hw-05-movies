import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';

const apiKey = '47654636e0a81733a8194af924ebd404';

function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error('Failed to fetch movies:', error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className={styles.homeContainer}>
      <h1>Popular Movies</h1>
      <div className={styles.moviesList}>
        {movies.map(movie => (
          <Link
            key={movie.id}
            to={`/movies/${movie.id}`}
            className={styles.movieItem}
          >
            <h2 className={styles.movieTitle}>{movie.title}</h2>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
