import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './Cast.module.css';

const apiKey = '47654636e0a81733a8194af924ebd404';

function Cast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`
        );
        setCast(response.data.cast);
      } catch (error) {
        console.error('Failed to fetch cast:', error);
      }
    };

    fetchCast();
  }, [movieId]);

  return (
    <div className={styles.castList}>
      {cast.map(member => (
        <div key={member.cast_id} className={styles.castMember}>
          <img
            src={`https://image.tmdb.org/t/p/w200${member.profile_path}`}
            alt={member.name}
            onError={e => {
              e.target.onerror = null;
              e.target.src =
                'https://via.placeholder.com/200x300?text=No+Image';
            }}
          />
          <p>{member.name}</p>
          <p>as {member.character}</p>
        </div>
      ))}
    </div>
  );
}

Cast.propTypes = {
  //   movieId: PropTypes.string.isRequired,
  cast: PropTypes.array,
};

export default Cast;
