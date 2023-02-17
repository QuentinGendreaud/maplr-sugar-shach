import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from '../layout/layout';
import Cart from '../view/cart/cart';
import CatalogueView from '../view/catalogue/catalogue';
import ProductDetail from '../view/product-detail/product-detail';
import './app.scss';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<CatalogueView />} />
          <Route path="cart" element={<Cart />} />
          <Route path="product-detail/:productId" element={<ProductDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
