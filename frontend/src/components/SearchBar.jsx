import { useState } from "react";

function SearchBar({ onSearch, onClear }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const value = query.trim();

    if (!value) {
      onClear();
      return;
    }

    onSearch(value);
  };

  const handleClear = () => {
    setQuery("");
    onClear();
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search your files..."
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />

      <button type="submit">Search</button>

      {query && (
        <button type="button" onClick={handleClear}>
          Clear
        </button>
      )}
    </form>
  );
}

export default SearchBar;
