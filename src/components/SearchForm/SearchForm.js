import { useState } from "react";
import PropTypes from "prop-types";
import s from "./SearchForm.module.css";

function SearchForm({ onSubmit }) {
  const [searchValue, setSearchValue] = useState("");

  const handleChangeInput = (e) => {
    setSearchValue(e.currentTarget.value);
  };

  const handleSubmitQuery = (e) => {
    e.preventDefault();
    const normalizeQuery = searchValue.toLowerCase().trim(" ");
    onSubmit(normalizeQuery);

    setSearchValue("");
  };

  return (
    <form
      onSubmit={handleSubmitQuery}
      name="movie_search_form"
      className={s.form}
    >
      <input
        type="text"
        name="searchInput"
        autoFocus
        placeholder="Search movies"
        value={searchValue}
        onChange={handleChangeInput}
        className={s.input}
      />
      <button type="submit" className={s.btn}>
        Search
      </button>
    </form>
  );
}

export default SearchForm;

SearchForm.propTypes = {
  onSubmit: PropTypes.func,
};
