import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductDetails } from '../services/api';
import '../App.css';

const ProductDetail = () => {
    const { sku, storeId } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        fetchProductDetails(sku, storeId).then(setProduct);
    }, [sku, storeId]);

    if (!product) return <p>Loading...</p>;

    return (
        <div className="detail-container">
        <div className="detail-card">
          <h2 className="detail-title">{product.name}</h2>
          <p className="detail-category">{product.category}</p>
          <p className="detail-description">{product.description}</p>
          <p className="detail-price">${product.price.toFixed(2)}</p>
          <p
            className={`detail-availability ${
              product.available_for_delivery ? "available" : "not-available"
            }`}
          >
            {product.available_for_delivery ? "Available for Delivery" : "Not Available for Delivery"}
          </p>
        </div>
      </div>
    );
};

export default ProductDetail;
