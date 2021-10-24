import { useState, useEffect } from "react";
import { useRouteMatch, useLocation } from "react-router-dom";
import MoviesList from "../components/MoviesList/MoviesList";
import * as moviesInfoApi from "../services/movies-info-api";

function HomePage() {
  const [trendingMovies, setTrendingMovies] = useState(null);
  const location = useLocation();
  const { url } = useRouteMatch();

  useEffect(() => {
    moviesInfoApi.getTrending().then((data) => {
      setTrendingMovies(data.results);
    });
  }, []);

  return (
    trendingMovies && (
      <MoviesList
        movies={trendingMovies}
        location={location}
        url={`${url}movies`}
      />
    )
  );
}

export default HomePage;
