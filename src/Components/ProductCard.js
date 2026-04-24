import React from "react";

function ProductCard({ product }) {
  const shortDescription =
    product.description.length > 100
      ? `${product.description.slice(0, 100)}...`
      : product.description;

  return (
    <div className="product-card">
      <div className="image-wrapper">
        <img src={product.image} alt={product.title} />
      </div>
      <div className="product-content">
        <h2>{product.title}</h2>
        <p className="category">{product.category}</p>
        <p className="description">{shortDescription}</p>
        <div className="product-footer">
          <span className="price">${product.price.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
