const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    sku: String,
    name: String,
    description: String,
    category: String,
    price: Number,
    store_id: String,
    available_for_delivery: Boolean
});

module.exports = mongoose.model('Product', ProductSchema);
