# superk_project

### **🛠 Tech Stack**
- **Frontend:** React.js (Vite)  
- **Backend:** Node.js (Express.js)  
- **Database:** MongoDB  
- **Search Engine:** ElasticSearch  
- **Hosting:** AWS/GCP/DigitalOcean  

---

## 🚀 1. Project Overview  
The **SuperK Catalogue Project** enables store-level product catalog customization. Some products are only available for delivery and are not stocked physically at all stores.  
Using **ElasticSearch**, we ensure optimized search performance for 10,000 SKUs across 50 stores.

---

## 🔍 2. ElasticSearch Schema  

### **Index Name: `store_catalog`**  
```json
{
  "mappings": {
    "properties": {
      "sku": { "type": "keyword" },
      "name": { "type": "text" },
      "description": { "type": "text" },
      "category": { "type": "keyword" },
      "price": { "type": "float" },
      "store_id": { "type": "keyword" },
      "available_for_delivery": { "type": "boolean" }
    }
  }
}
```

---

## 📊 3. Sample Dataset  
Here’s a **sample JSON dataset** for 10,000 SKUs across 50 stores:

```json
[
  {
    "sku": "127",
    "name": "Olive Oil 2L",
    "description": "Premium quality olive oil",
    "category": "Grocery",
    "price": 15.99,
    "store_id": "StoreA",
    "available_for_delivery": true
  }
]
```

---

## 💪 4. Design Decisions  

### **🔹 Data Model & Indexing Strategy**
- **MongoDB** stores all products with store-level customization.  
- **ElasticSearch** is used for **fast search** and **filtering**.  
- **`store_id` and `category` fields are stored as `keyword`** for exact matches.  

---

## 🌍 5. API Endpoints and Usage  

### **🔹 Fetch Products by Store**
#### **GET `/api/products/store/:storeId`**
```bash
curl -X GET "http://localhost:5000/api/products/store/StoreA"
```

### **🔹 Search Products with Filters**
#### **GET `/api/products/search?storeId=StoreA&category=Grocery&min_price=10&max_price=20`**
```bash
curl -X GET "http://localhost:5000/api/products/search?storeId=StoreA&category=Grocery&min_price=10&max_price=20"
```

### **🔹 Fetch Product Details**
#### **GET `/api/products/:sku/:storeId`**
```bash
curl -X GET "http://localhost:5000/api/products/127/StoreA"
```

---

## ⚙️ 6. Setup Instructions  

### **🛠 Backend Setup**
```bash
cd backend
npm install
node index.js
```

### **🖥️ Frontend Setup**
```bash
cd frontend
npm install
npm run dev
```

### **🛡️ ElasticSearch Setup**
```bash
./elasticsearch-8.17.2/bin/elasticsearch
node elasticsearch/createIndex.js
node elasticsearch/seedData.js
```

---

## 🚀 7. Features Implemented
✔️ **Store Selector** (Dropdown for store selection)  
✔️ **Product Listing** (Shows store-specific products)  
✔️ **Search & Filter** (Category, price range, availability)  
✔️ **Product Details** (Store-level customization)  
✔️ **Optimized ElasticSearch Queries**  

---

## 🎯 8. Future Enhancements  
🚀 **Implement pagination** for large product lists  
🚀 **Store-specific promotions**  
🚀 **Product comparison across stores**  

---

## 🐝 License  
This project is licensed under **MIT License**.  

