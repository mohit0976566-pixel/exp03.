import React from "react";

function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar">
      <label htmlFor="search">Search Products</label>
      <input
        id="search"
        type="text"
        value={value}
        placeholder="Search by title..."
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;
