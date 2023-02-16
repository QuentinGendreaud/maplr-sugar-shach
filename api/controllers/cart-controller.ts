import { Request, Response } from 'express';
import { serviceResponseConstantes } from '../constants/service-response.const';
import ServiceResponse from '../interfaces/service-response';
import RequestMiddleware from '../middlewares/request-middleware';
import CartService from '../services/cart-service';

class CartController {
  private readonly cartService = new CartService();

  public getCart(res: Response) {
    this.cartService.getCart().subscribe({
      next: (cartLines) => res.status(serviceResponseConstantes.SUCCESS.code).json(cartLines),
      error: (error: ServiceResponse) => res.status(error.code).json(error)
    });
  }

  public putProductToCart(req: Request, res: Response) {
    if (RequestMiddleware.areRequestParamsValid(req, res)) {
      const productId = req.query.productId as string;
      this.cartService.putProductToCart(productId).subscribe({
        next: () => res.status(serviceResponseConstantes.ACCEPTED.code).json(),
        error: (error: ServiceResponse) => res.status(error.code).json(error)
      });
    }
  }

  public deleteProductFromCart(req: Request, res: Response) {
    if (RequestMiddleware.areRequestParamsValid(req, res)) {
      const productId = req.query.productId as string;
      this.cartService.deleteProductFromCart(productId).subscribe({
        next: () => res.status(serviceResponseConstantes.ACCEPTED.code).json(),
        error: (error: ServiceResponse) => res.status(error.code).json(error)
      });
    }
  }

  public patchProductFromCart(req: Request, res: Response) {
    if (RequestMiddleware.areRequestParamsValid(req, res)) {
      const productId = req.query.productId as string;
      const newQty = parseInt(req.query.newQty as string);
      this.cartService.patchProductFromCart(productId, newQty).subscribe({
        next: () => res.status(serviceResponseConstantes.ACCEPTED.code).json(),
        error: (error: ServiceResponse) => res.status(error.code).json(error)
      });
    }
  }
}

export default CartController;
