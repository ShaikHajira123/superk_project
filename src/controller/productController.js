const client = require('../config/elasticsearch');
const Product = require('../models/Product');

// Add a new product to MongoDB and ElasticSearch
exports.addProduct = async (req, res) => {
    const { sku, name, description, category, price, store_id, available_for_delivery } = req.body;

    try {
        // Save product in MongoDB
        const newProduct = new Product({ sku, name, description, category, price, store_id, available_for_delivery });
        await newProduct.save();

        // Index product in ElasticSearch
        await client.index({
            index: 'store_catalog',
            id: sku,
            body: { sku, name, description, category, price, store_id, available_for_delivery }
        });

        res.status(201).json({ message: 'Product added successfully', product: newProduct });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Fetch products by Store ID
exports.getProductsByStore = async (req, res) => {
    const { storeId } = req.params;

    try {
        const response = await client.search({
            index: 'store_catalog',
            body: {
                query: {
                    bool: {
                        must: [
                            { term: { "store_id.keyword": storeId } },  // Ensure correct field type
                            { term: { "available_for_delivery": true } }
                        ]
                    }
                }
            }
        });

        if (!response.hits || !response.hits.hits) {
            return res.status(500).json({ message: "ElasticSearch response is incorrect", response });
        }

        res.json(response.hits.hits.map(hit => hit._source));
    } catch (error) {
        console.error("ElasticSearch Query Error:", error);
        res.status(500).json({ message: error.message });
    }
};

// Search products with filters (category, price range)
exports.searchProducts = async (req, res) => {
    const { storeId, category, min_price, max_price } = req.query;

    let filters = [
        { term: { "store_id.keyword": storeId } },
        { term: { available_for_delivery: true } }
    ];

    if (category) filters.push({ term: { "category.keyword": category } });
    if (min_price) filters.push({ range: { price: { gte: parseFloat(min_price) } } });
    if (max_price) filters.push({ range: { price: { lte: parseFloat(max_price) } } });

    try {
        const response = await client.search({
            index: 'store_catalog',
            body: {
                query: {
                    bool: {
                        must: filters
                    }
                }
            }
        });

        if (!response.hits || !response.hits.hits) {
            return res.status(500).json({ message: "ElasticSearch response is incorrect", response });
        }

        res.json(response.hits.hits.map(hit => hit._source));
    } catch (error) {
        console.error("ElasticSearch Query Error:", error);
        res.status(500).json({ message: error.message });
    }
};


// Fetch product details by SKU and Store ID
exports.getProductDetails = async (req, res) => {
    const { sku, storeId } = req.params;

    try {
        const response = await client.search({
            index: 'store_catalog',
            body: {
                query: {
                    bool: {
                        must: [
                            { term: { "sku.keyword": sku } },
                            { term: { "store_id.keyword": storeId } }
                        ]
                    }
                }
            }
        });

        if (response.hits.total.value === 0) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Return the product from ElasticSearch
        res.json(response.hits.hits[0]._source);

    } catch (error) {
        console.error("Error fetching product details:", error);
        res.status(500).json({ message: error.message });
    }
};

