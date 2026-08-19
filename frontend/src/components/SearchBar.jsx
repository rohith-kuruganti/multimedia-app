import { useState } from "react";

function SearchBar({ onSearch, onClear }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      onClear();
      return;
    }

    onSearch(trimmedQuery);
  };

  const handleClear = () => {
    setQuery("");
    onClear();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search files..."
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
