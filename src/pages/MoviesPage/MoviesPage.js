import { useState, useEffect } from "react";
import { useRouteMatch, useHistory, useLocation } from "react-router-dom";
import SearchForm from "../../components/SearchForm/SearchForm";
import MoviesList from "../../components/MoviesList/MoviesList";
import * as MovieInfoApi from "../../services/movies-info-api";
import s from "./MoviesPage.module.css";

function MoviesPage() {
  const [searchData, setSearchData] = useState(null);
  const { url } = useRouteMatch();
  const location = useLocation();
  const history = useHistory();

  const searchQuery = new URLSearchParams(location.search).get("query") ?? "";

  useEffect(() => {
    searchQuery &&
      MovieInfoApi.getMovieByQuery(searchQuery).then((data) => {
        setSearchData(data.results);
        data.results.length === 0 && history.push({ ...location, search: "" });
      });
  }, [history, location, searchQuery]);

  const onSubmit = (query) => {
    query && history.push({ ...location, search: `query=${query}` });
  };

  return (
    <>
      <SearchForm onSubmit={onSubmit} />
      {searchData && searchData.length !== 0 ? (
        <MoviesList movies={searchData} url={url} location={location} />
      ) : (
        <p className={s.message}>
          {searchData && searchData.length === 0
            ? "There are no matching results for your search."
            : "There is nothing here yet..."}
        </p>
      )}
    </>
  );
}

export default MoviesPage;
