import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import * as moviesInfoApi from "../services/movies-info-api";

function HomePage() {
  const [trendingMovies, setTrendingMovies] = useState(null);

  const location = useLocation();

  useEffect(() => {
    moviesInfoApi.getTrending().then((data) => setTrendingMovies(data.results));
  }, []);

  return (
    trendingMovies && (
      <ul>
        {trendingMovies.map((movie) => (
          <li key={movie.id}>
            {/* <NavLink to={`/movies/${movie.id}`}>{movie.title}</NavLink> */}
            <NavLink
              to={{
                pathname: `/movies/${movie.id}`,
                state: { from: location },
              }}
            >
              {movie.title}
            </NavLink>
          </li>
        ))}
      </ul>
    )
  );
}

export default HomePage;
