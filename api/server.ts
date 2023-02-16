import CartRouter from './routers/cart-router';
import App from './app';
import ProductRouter from './routers/product-router';
import OrderRouter from './routers/order-router';

// Initiate our app
const app = new App([new CartRouter(), new ProductRouter(), new OrderRouter()], 8080);

// Launch server listening on init port 8080
app.listen();
