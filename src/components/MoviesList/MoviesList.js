import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import s from "./MoviesList.module.css";

function MoviesList({ movies, url, location }) {
  return (
    <ul className={s.list}>
      {movies.map((movie) => (
        <li key={movie.id} className={s.item}>
          <NavLink
            to={{
              pathname: `${url}/${movie.id}`,
              state: { from: location },
            }}
            className={s.link}
            activeClassName={s.activeLink}
          >
            {movie.title}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}

export default MoviesList;

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object),
  url: PropTypes.string,
  location: PropTypes.object,
};
