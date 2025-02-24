import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductsByStore, searchProducts } from '../services/api';
import '../App.css';

const ProductList = () => {
    const { storeId } = useParams();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    useEffect(() => {
        fetchProductsByStore(storeId).then(setProducts);
    }, [storeId]);

    const handleSearch = () => {
        const filters = { category, min_price: minPrice, max_price: maxPrice };
        searchProducts(storeId, filters).then(setProducts);
    };

    return (
      <div className="product-container">
      <h2 className="product-title">Products in {storeId}</h2>

      {/* Filter Section */}
      <div className="filter-section">
        <select className="filter-input" onChange={(e) => setCategory(e.target.value)}>
          <option value="">All Categories</option>
          <option value="Grocery">Grocery</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Furniture">Furniture</option>
        </select>

        <input
          type="number"
          className="filter-input"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />

        <input
          type="number"
          className="filter-input"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />

        <button className="filter-button" onClick={handleSearch}>Search</button>
      </div>

      {/* Product Grid */}
      <div className="product-grid">
        {products.map((product) => (
          <div
            key={product.sku}
            className="product-card"
            onClick={() => navigate(`/product/${product.sku}/${storeId}`)}
          >
            <h3>{product.name}</h3>
            <p className="category">{product.category}</p>
            <p className="price">${product.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
    );
};

export default ProductList;
