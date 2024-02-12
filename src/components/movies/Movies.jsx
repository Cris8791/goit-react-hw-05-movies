import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './Movies.module.css';

const apiKey = '47654636e0a81733a8194af924ebd404';

function Movies() {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async event => {
    event.preventDefault();
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`
      );
      setSearchResults(response.data.results);
    } catch (error) {
      console.error('Failed to search movies:', error);
    }
  };

  return (
    <div>
      <div className={styles.searchBarContainer}>
        <h1 className={styles.searchBarTitle}>Search for movies</h1>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            className={styles.searchInput}
          />
          <button type="submit" className={styles.searchButton}>
            Search
          </button>
        </form>
      </div>

      <div className={styles.moviesList}>
        {searchResults.map(movie => (
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

Movies.propTypes = {
  query: PropTypes.string,
  searchResults: PropTypes.array,
};

export default Movies;
