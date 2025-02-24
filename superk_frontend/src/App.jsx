import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import StoreSelection from "./pages/StoreSelection";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Router>
      <Routes>
        <Route path="/" element={<StoreSelection />} />
        <Route path="/products/:storeId" element={<ProductList />} />
        <Route path="/product/:sku/:storeId" element={<ProductDetail />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
