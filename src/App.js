import { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import AppBar from "./components/AppBar/AppBar";
import Load from "./components/Loader/Loader";
// import HomePage from "./pages/HomePage";
// import MoviesPage from "./pages/MoviesPage/MoviesPage";
// import MovieDetailsPage from "./pages/MovieDetailsPage/MovieDetailsPage";
// import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import "./App.css";

function App() {
  const HomePage = lazy(() =>
    import("./pages/HomePage" /* webpackChunkName: "home-page" */)
  );

  const MoviesPage = lazy(() =>
    import(
      "./pages/MoviesPage/MoviesPage" /* webpackChunkName: "movies-page" */
    )
  );

  const MovieDetailsPage = lazy(() =>
    import(
      "./pages/MovieDetailsPage/MovieDetailsPage" /* webpackChunkName: "movie-details-page" */
    )
  );

  const NotFoundPage = lazy(() =>
    import(
      "./pages/NotFoundPage/NotFoundPage" /* webpackChunkName: "not-found-page" */
    )
  );

  return (
    <div className="App">
      <AppBar />
      <Suspense fallback={<Load />}>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>

          <Route exact path="/movies">
            <MoviesPage />
          </Route>

          <Route path="/movies/:movieId">
            <MovieDetailsPage />
          </Route>

          <Route>
            <NotFoundPage />
          </Route>
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
