import React, { Suspense, lazy } from 'react';
import { NavLink, Route } from 'react-router-dom';

// import HomePage from './Views/HomePage.js';
// import MoviesPage from './Views/MoviesPage.js';
// import MovieDetailsPage from './Views/MovieDetailsPage.js';

import routes from './routes';
import './App.css';

const HomePage = lazy(() =>
  import('./Views/HomePage.js' /* webpackChunkName: "home-page" */),
);
const MoviesPage = lazy(() =>
  import('./Views/MoviesPage.js' /* webpackChunkName: "movies-page" */),
);
const MovieDetailsPage = lazy(() =>
  import(
    './Views/MovieDetailsPage.js' /* webpackChunkName: "movie-details-page" */
  ),
);

function App() {
  return (
    <>
      <nav>
        <ul className="navList">
          <li className="navItem">
            <NavLink
              className="navLink"
              activeClassName="navLinkActive"
              exact
              to="/"
            >
              Home
            </NavLink>
          </li>
          <li className="navItem">
            <NavLink
              className="navLink"
              activeClassName="navLinkActive"
              to="/movies"
            >
              Movies
            </NavLink>
          </li>
        </ul>
      </nav>
      <Suspense fallback={<h1>Загружаем...</h1>}>
        <Route path={routes.home} exact component={HomePage} />
        <Route path={routes.movies} exact component={MoviesPage} />
        <Route path={routes.movieDetails} component={MovieDetailsPage} />
      </Suspense>
    </>
  );
}

export default App;
