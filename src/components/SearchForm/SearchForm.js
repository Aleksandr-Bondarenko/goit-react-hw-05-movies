import { useState } from "react";

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
    <form onSubmit={handleSubmitQuery} name="movie_search_form">
      <input
        type="text"
        name="searchInput"
        autoFocus
        value={searchValue}
        onChange={handleChangeInput}
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchForm;
