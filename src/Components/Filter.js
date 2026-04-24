import React from "react";

function Filter({ categories, selectedCategory, onCategoryChange, sortOrder, onSortChange }) {
  return (
    <div className="filter-panel">
      <div className="filter-group">
        <label htmlFor="category">Category</label>
        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="sort">Sort by Price</label>
        <select id="sort" value={sortOrder} onChange={(e) => onSortChange(e.target.value)}>
          <option value="none">Default</option>
          <option value="low">Low to High</option>
          <option value="high">High to Low</option>
        </select>
      </div>
    </div>
  );
}

export default Filter;
