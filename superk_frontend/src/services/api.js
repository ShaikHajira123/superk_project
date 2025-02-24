import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/products';

export const fetchStores = async () => {
    let stores = [];
    for (let store = 1; store <= 50; store++) {
        stores.push(`Store${store}`);
    }
    return stores;
};

export const fetchProductsByStore = async (storeId) => {
    const response = await axios.get(`${API_BASE_URL}/store/${storeId}`);
    return response.data;
};

export const searchProducts = async (storeId, filters) => {
    const query = new URLSearchParams(filters).toString();
    const response = await axios.get(`${API_BASE_URL}/search?storeId=${storeId}&${query}`);
    return response.data;
};

export const fetchProductDetails = async (sku, storeId) => {
    const response = await axios.get(`${API_BASE_URL}/${sku}/${storeId}`);
    return response.data;
};
