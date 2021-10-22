import { Link } from "react-router-dom";

function MoviesList({ movies, url, location }) {
  console.log(location);
  return (
    <ul>
      {movies.map((movie) => (
        <li key={movie.id}>
          <Link
            to={{
              pathname: `${url}/${movie.id}`,
              state: { from: location },
            }}
          >
            {movie.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default MoviesList;
