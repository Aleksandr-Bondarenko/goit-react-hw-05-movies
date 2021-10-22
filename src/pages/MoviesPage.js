import { useState, useEffect } from "react";
import {
  Route,
  useRouteMatch,
  useHistory,
  useLocation,
} from "react-router-dom";
import SearchForm from "../components/SearchForm/SearchForm";
import MoviesList from "../components/MoviesList/MoviesList";
import * as MovieInfoApi from "../services/movies-info-api";

function MoviesPage() {
  const [searchQuery, setSearchQuery] = useState(null);
  const [searchData, setSearchData] = useState(null);

  const { url, path } = useRouteMatch();
  const location = useLocation();
  const history = useHistory();

  //   useEffect(() => {
  //     if (searchQuery) {
  //       MovieInfoApi.getMovieByQuery(searchQuery).then((data) => {
  //         setSearchData(data.results);
  //         console.log(data.results);
  //       });
  //     } else {
  //       console.log("Edit search query");
  //     }
  //   }, [searchQuery]);

  const LocSearch = new URLSearchParams(location.search).get("query") ?? "";
  console.log(LocSearch);

  useEffect(() => {
    if (LocSearch) {
      MovieInfoApi.getMovieByQuery(LocSearch).then((data) => {
        setSearchData(data.results);
        console.log(data.results);
      });
    } else {
      console.log("Edit search query");
    }
  }, [LocSearch]);

  const onSubmit = (query) => {
    // setSearchQuery(query);
    history.push({ ...location, search: `query=${query}` });

    // setSearchQuery(search);
  };

  console.log(url);

  return (
    <>
      <SearchForm onSubmit={onSubmit} />
      {searchData && searchData.length !== 0 ? (
        <MoviesList movies={searchData} url={url} location={location} />
      ) : (
        <p>
          {searchData && searchData.length === 0
            ? "Nothing was find"
            : "What are you search?"}
        </p>
      )}

      {/* {searchData && (
        <Route path={`${path}?query=${searchQuery}`}>
          <MoviesList movies={searchData} url={url} location={location} />
        </Route>
      )} */}
    </>
  );
}

export default MoviesPage;
