import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchStores } from '../services/api';
import '../App.css';

const StoreSelection = () => {
    const navigate = useNavigate();
    const [stores, setStores] = useState([]);
    const [selectedStore, setSelectedStore] = useState('');

    useEffect(() => {
        fetchStores().then(setStores);
    }, []);

    return (
      <div className="store-container">
      <h2 className="store-title">Select Your Store</h2>
      <div className="store-box">
        <select className="store-dropdown" onChange={(e) => setSelectedStore(e.target.value)}>
          <option value="">Choose Store</option>
          {stores.map((store) => (
            <option key={store} value={store}>
              {store}
            </option>
          ))}
        </select>
        <button
          className={`store-button ${selectedStore ? "" : "disabled"}`}
          onClick={() => navigate(`/products/${selectedStore}`)}
          disabled={!selectedStore}
        >
          Proceed
        </button>
      </div>
    </div>
    );
};

export default StoreSelection;
