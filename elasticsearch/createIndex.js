const { Client } = require('@elastic/elasticsearch');
require('dotenv').config();

const client = new Client({ node: process.env.ELASTICSEARCH_URI || 'http://localhost:9200' });

const createIndex = async () => {
    try {
        const exists = await client.indices.exists({ index: 'store_catalog' });

        if (!exists.body) {
            await client.indices.create({
                index: 'store_catalog',
                body: {
                    mappings: {
                        properties: {
                            sku: { type: "keyword" },
                            name: { type: "text" },
                            description: { type: "text" },
                            category: { type: "keyword" },
                            price: { type: "float" },
                            store_id: { type: "keyword" },
                            available_for_delivery: { type: "boolean" }
                        }
                    }
                }
            });

            console.log("ElasticSearch Index Created: store_catalog");
        } else {
            console.log("'store_catalog' already exists.");
        }
    } catch (error) {
        console.error("Error creating index:", error);
    }
};

createIndex();
