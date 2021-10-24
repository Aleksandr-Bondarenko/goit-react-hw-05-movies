import { useState, useEffect, lazy, Suspense } from "react";
import {
  NavLink,
  useParams,
  useRouteMatch,
  useHistory,
  useLocation,
  Route,
} from "react-router-dom";
// import Cast from "../../components/Cast/Cast";
// import Reviews from "../../components/Reviews/Reviews";
import * as movieInfoApi from "../../services/movies-info-api";
import notFoundImg from "../../images/not-found-image.jpg";
import Load from "../../components/Loader/Loader";
import s from "./MovieDetailsPage.module.css";

function MovieDetailsPage() {
  const history = useHistory();
  const location = useLocation();
  const [movieDetails, setMovieDetails] = useState(null);
  const [locState, setLocState] = useState(null);

  const { movieId } = useParams();
  const { path, url } = useRouteMatch();

  const Cast = lazy(() =>
    import("../../components/Cast/Cast" /* webpackChunkName: "cast" */)
  );
  const Reviews = lazy(() =>
    import("../../components/Reviews/Reviews" /* webpackChunkName: "reviews" */)
  );

  useEffect(() => {
    movieInfoApi.getMovieById(movieId).then((data) => {
      setMovieDetails(data);
    });
  }, [movieId]);

  useEffect(() => {
    if (location && location.state && location.state.from) {
      !Object.keys(location.state.from).includes("locState") &&
        setLocState((prevLocState) => ({
          ...prevLocState,
          ...location.state.from,
        }));
    }
  }, [location]);

  const getGenres = (genresData) => {
    if (genresData.length === 0) {
      return "N/A";
    } else if (genresData.length > 3) {
      genresData.splice(3, genresData.length - 3);
      genresData.push({ name: "Other" });
    }

    return genresData.map((genre) => genre.name).join(" ");
  };

  const getImageUrl = (size) => {
    return `https://image.tmdb.org/t/p/w${size}`;
  };

  const handleClickOnBackBtn = () => {
    locState ? history.push(locState) : history.push("/");
  };

  return (
    <>
      {movieDetails && (
        <>
          <button
            className={s.btn}
            type="button"
            onClick={handleClickOnBackBtn}
          >
            Go back
          </button>

          <div className={s.movieBox}>
            <img
              src={
                movieDetails.poster_path
                  ? `${getImageUrl(342)}${movieDetails.poster_path}`
                  : notFoundImg
              }
              alt={movieDetails.tagline}
              width={!movieDetails.poster_path ? 342 : null}
              className={s.poster}
            />

            <div className={s.descBox}>
              <h1 className={s.title}>
                {movieDetails.title}
                {movieDetails.release_date &&
                  `(${movieDetails.release_date.slice(0, 4)})`}
              </h1>
              <p>User Score: {movieDetails.vote_average * 10}%</p>
              <h2>Overview</h2>
              <p>{movieDetails.overview ? movieDetails.overview : "N/A"}</p>

              <h2>Genres</h2>
              <p>{getGenres(movieDetails.genres)}</p>

              <h2 className={s.additionalTitle}>Additional inform</h2>
              <div className={s.linkBox}>
                <NavLink
                  to={{
                    pathname: `${url}/credits`,
                    state: {
                      from: { locState },
                    },
                  }}
                  className={s.link}
                  activeClassName={s.activeLink}
                >
                  Cast
                </NavLink>
                <NavLink
                  to={{
                    pathname: `${url}/reviews`,
                    state: {
                      from: { locState },
                    },
                  }}
                  className={s.link}
                  activeClassName={s.activeLink}
                >
                  Reviews
                </NavLink>
              </div>
            </div>
          </div>

          <Suspense fallback={<Load />}>
            <Route path={`${path}/credits`}>
              <Cast movieId={movieId} url={getImageUrl(185)} />
            </Route>
            <Route path={`${path}/reviews`}>
              <Reviews movieId={movieId} />
            </Route>
          </Suspense>
        </>
      )}
    </>
  );
}

export default MovieDetailsPage;
