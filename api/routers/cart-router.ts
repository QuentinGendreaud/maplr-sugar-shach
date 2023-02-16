import express from 'express';
import CartController from '../controllers/cart-controller';
import CartValidator from '../validators/cart-validator';

class CartRouter {
    public path = '/cart';
    public router = express.Router();
    private readonly cartController = new CartController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(this.path, (req, res) => this.cartController.getCart(res)),
        this.router.put(this.path, CartValidator.checkPutCart(), (req, res) => this.cartController.putProductToCart(req, res)),
        this.router.delete(this.path, CartValidator.checkDeleteCart(), (req, res) => this.cartController.deleteProductFromCart(req, res))
        this.router.patch(this.path, CartValidator.checkPatchCart(), (req, res) => this.cartController.patchProductFromCart(req, res))
    }
}

export default CartRouter;