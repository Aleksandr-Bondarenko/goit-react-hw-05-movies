import { useState, useEffect } from "react";
import {
  NavLink,
  useParams,
  useRouteMatch,
  useHistory,
  useLocation,
  Route,
} from "react-router-dom";
import Cast from "../components/Cast/Cast";
import Reviews from "../components/Reviews/Reviews";
import * as movieInfoApi from "../services/movies-info-api";

function MovieDetailsPage() {
  const [movieDetails, setMovieDetails] = useState(null);
  const { movieId } = useParams();
  const { path, url } = useRouteMatch();
  //   const history = useHistory();
  const location = useLocation();
  const history = useHistory();
  console.log(location);

  useEffect(() => {
    movieInfoApi.getMovieById(movieId).then((data) => {
      //   console.log(data);
      setMovieDetails(data);
    });
  }, [movieId]);

  //   const { title, poster_path, release_date, overview, genres } = movieDetails;

  const getGenres = (genresData) => {
    // console.log(genresData.map((genre) => genre.name).join(" "));
    return genresData.map((genre) => genre.name).join(" ");
  };

  const getImageUrl = (size) => {
    return `http://image.tmdb.org/t/p/w${size}`;
  };

  const handleClickOnBackBtn = () => {
    history.push(location.state.from);
  };

  return (
    <>
      {movieDetails && (
        <>
          <button type="button" onClick={handleClickOnBackBtn}>
            Go back
          </button>
          <h1>
            {movieDetails.title}
            {` (${movieDetails.release_date.slice(0, 4)})`}
          </h1>
          <p>User Score: {movieDetails.vote_average * 10}%</p>
          <h2>Overview</h2>
          <p>{movieDetails.overview}</p>
          {/* <p>{movieDetails.genres}</p> */}

          <h2>Genres</h2>
          <p>{getGenres(movieDetails.genres)}</p>

          <img
            src={`${getImageUrl(342)}${movieDetails.poster_path}`}
            alt={movieDetails.tagline}
          />

          <h2 className="additionalTitle">Additional inform</h2>
          {/* <NavLink to={`${url}/credits`}>Cast</NavLink> */}
          <NavLink
            to={{
              pathname: `${url}/credits`,
              state: {
                from: location.state.from,
              },
            }}
          >
            Cast
          </NavLink>
          <NavLink
            to={{
              pathname: `${url}/reviews`,
              state: {
                from: location.state.from,
              },
            }}
          >
            Reviews
          </NavLink>

          <Route path={`${path}/credits`}>
            <Cast movieId={movieId} url={getImageUrl(45)} />
          </Route>
          <Route path={`${path}/reviews`}>
            <Reviews movieId={movieId} />
          </Route>
        </>
      )}
    </>
  );
}

export default MovieDetailsPage;
