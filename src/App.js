import React, { useState, useEffect } from "react";
import ProductCard from "./Components/ProductCard";
import SearchBar from "./Components/SearchBar";
import Filter from "./Components/Filter";
import Loader from "./Components/Loader";

const API_URL = "https://fakestoreapi.com/products";

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("none");
  const [darkMode, setDarkMode] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Unable to fetch products. Please try again.");
      }
      const data = await response.json();
      setProducts(data);
      setFilteredProducts(data);
      const uniqueCategories = ["All", ...new Set(data.map((item) => item.category))];
      setCategories(uniqueCategories);
    } catch (err) {
      setError(err.message || "Something went wrong.");
      setProducts([]);
      setFilteredProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    let updatedProducts = [...products];

    if (searchTerm.trim() !== "") {
      updatedProducts = updatedProducts.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== "All") {
      updatedProducts = updatedProducts.filter(
        (product) => product.category === selectedCategory
      );
    }

    if (sortOrder === "low") {
      updatedProducts.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "high") {
      updatedProducts.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(updatedProducts);
  }, [products, searchTerm, selectedCategory, sortOrder]);

  return (
    <div className={darkMode ? "app dark-mode" : "app"}>
      <div className="app-header">
        <h1>React API Fetch Shop</h1>
        <div className="toolbar">
          <button className="primary-button" onClick={fetchProducts}>
            Load Products
          </button>
          <button className="secondary-button" onClick={fetchProducts}>
            Refresh
          </button>
          <button
            className="toggle-button"
            onClick={() => setDarkMode((prev) => !prev)}
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      </div>

      <div className="filters-row">
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
        <Filter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          sortOrder={sortOrder}
          onSortChange={setSortOrder}
        />
      </div>

      <div className="status-row">
        {loading && <Loader />}
        {error && <div className="error-message">{error}</div>}
        {!loading && !error && filteredProducts.length === 0 && (
          <div className="empty-state">No products match your search.</div>
        )}
      </div>

      <div className="product-grid">
        {filteredProducts.slice(0, 12).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default App;
