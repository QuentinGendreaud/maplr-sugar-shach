import { Request, Response } from 'express';
import { mergeMap } from 'rxjs/operators';
import { serviceResponseConstantes } from '../constants/service-response.const';
import OrderLineDto from '../interfaces/order-line';
import ServiceResponse from '../interfaces/service-response';
import RequestMiddleware from '../middlewares/request-middleware';
import CartService from '../services/cart-service';
import OrderService from '../services/order-service';

class OrderController {
    private readonly orderService = new OrderService()
    private readonly cartService = new CartService()

    public sendOrder (req: Request, res: Response) {
        if (RequestMiddleware.areRequestParamsValid(req, res)){
            const order: OrderLineDto[] = req.body;
            
            this.orderService.sendOrder(order).pipe(
                mergeMap(() => this.cartService.clearCart())
            ).subscribe({
                next: () => res.status(serviceResponseConstantes.SUCCESS.code).json({isOrderValid: true}),
                error: (error: ServiceResponse) => res.status(error.code).json({
                    isOrderValid: false,
                    errors: [`Error ${error.code}: ${error.description}`]
                })
            });
        }
    }
}

export default OrderController;