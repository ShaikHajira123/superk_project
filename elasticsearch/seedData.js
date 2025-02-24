const { Client } = require('@elastic/elasticsearch');
const { faker } = require('@faker-js/faker');
require('dotenv').config();

const client = new Client({ node: process.env.ELASTICSEARCH_URI || 'http://localhost:9200' });

const STORES = 50;
const PRODUCTS_PER_STORE = 200; // 50 stores * 200 products = 10,000 SKUs

const categories = ["Electronics", "Grocery", "Clothing", "Furniture", "Beauty"];

const generateProducts = () => {
    const bulkData = [];

    for (let store = 1; store <= STORES; store++) {
        for (let i = 1; i <= PRODUCTS_PER_STORE; i++) {
            const product = {
                sku: `${store}-${i}`,
                name: faker.commerce.productName(),
                description: faker.commerce.productDescription(),
                category: faker.helpers.arrayElement(categories),
                price: parseFloat(faker.commerce.price()),
                store_id: `Store${store}`,
                available_for_delivery: faker.datatype.boolean()
            };

            bulkData.push({ index: { _index: 'store_catalog' } });
            bulkData.push(product);
        }
    }

    return bulkData;
};

const seedData = async () => {
    try {
        const products = generateProducts();
        await client.bulk({ body: products });

        console.log("10,000 SKUs Inserted into ElasticSearch");
    } catch (error) {
        console.error("Error inserting data:", error);
    }
};

seedData();
