import React, { Suspense, lazy } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from 'react-router-dom';
import styled from 'styled-components';
import styles from './App.module.css';

// Lazy-loaded components
const Home = lazy(() => import('./home/Home'));
const Movies = lazy(() => import('./movies/Movies'));
const MovieDetails = lazy(() => import('./movieDetails/MovieDetails'));
const Cast = lazy(() => import('./cast/Cast'));
const Reviews = lazy(() => import('./reviews/Reviews'));

// Stilizare pentru NavLink
const StyledNavLink = styled(NavLink)`
  margin-right: 10px;
  text-decoration: none;
  color: black;
  &.active {
    font-weight: bold;
    color: red;
  }
`;

const App = () => {
  return (
    <Router>
      <nav className={styles.navLinks}>
        <StyledNavLink to="/" end>
          Acasă
        </StyledNavLink>
        <StyledNavLink to="/movies">Filme</StyledNavLink>
      </nav>
      <Suspense fallback={<div>Se încarcă...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/:movieId" element={<MovieDetails />}>
            <Route path="cast" element={<Cast />} />
            <Route path="reviews" element={<Reviews />} />
          </Route>
          <Route path="*" element={<Home />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
