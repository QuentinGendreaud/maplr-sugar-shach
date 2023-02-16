import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from '../layout/layout';
import Cart from '../view/cart/catalogue';
import Catalogue from '../view/catalogue/catalogue';
import ProductDetail from '../view/product-detail/catalogue';
import './app.scss';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Catalogue />} />
          <Route path="cart" element={<Cart />} />
          <Route path="product-detail/:productId" element={<ProductDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
