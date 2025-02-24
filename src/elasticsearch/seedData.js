const client = require('../config/elasticsearch');

const sampleProducts = [
    { sku: "123", name: "Rice Bag 26kg", category: "Grocery", price: 100, store_id: "StoreA", available_for_delivery: true },
    { sku: "124", name: "Wheat Flour 5kg", category: "Grocery", price: 50, store_id: "StoreA", available_for_delivery: true },
    { sku: "125", name: "Milk 1L", category: "Dairy", price: 10, store_id: "StoreB", available_for_delivery: true },
];

const seedData = async () => {
    for (let product of sampleProducts) {
        await client.index({
            index: 'store_catalog',
            body: product
        });
    }
    console.log('Sample Data Seeded');
};

seedData();
