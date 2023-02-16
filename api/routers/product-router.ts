import express from 'express';
import ProductController from '../controllers/product-controller';
import ProductValidator from '../validators/product-validator';

class ProductRouter {
  public path = '/products';
  public router = express.Router();
  private readonly productController = new ProductController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, ProductValidator.checkGetProductFromType(), (req, res) =>
      this.productController.getCatalogueItems(req, res)
    ),
      this.router.get(`${this.path}/:productId`, ProductValidator.checkGetProductElement(), (req, res) =>
        this.productController.getMapleSyrupDetail(req, res)
      );
  }
}

export default ProductRouter;
