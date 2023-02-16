import express from 'express';
import OrderController from '../controllers/order-controller';
import OrderValidator from '../validators/order-validator';

class OrderRouter {
  public path = '/order';
  public router = express.Router();
  private readonly orderController = new OrderController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(this.path, OrderValidator.checkPostOrder(), (req, res) => this.orderController.sendOrder(req, res));
  }
}

export default OrderRouter;
