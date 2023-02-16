import { of, throwError } from 'rxjs';
import { Request, Response } from 'express';
import { serviceResponseConstantes } from '../constants/service-response.const';
import RequestMiddleware from '../middlewares/request-middleware';
import { mockOrder } from '../mocks/order-mock';
import OrderController from './order-controller';

// Mock CartService
const mockCartService = {
  clearCart: jest.fn().mockReturnValue(of(undefined))
};
jest.mock('../services/cart-service', () => {
  return jest.fn().mockImplementation(() => ({
    clearCart: mockCartService.clearCart
  }));
});

// Mock OrderService
const mockOrderService = {
  sendOrder: jest.fn().mockReturnValue(of(undefined))
};
jest.mock('../services/order-service', () => {
  return jest.fn().mockImplementation(() => ({
    sendOrder: mockOrderService.sendOrder
  }));
});

describe('OrderController', () => {
  let controller: OrderController;

  // Mock response param
  const req: Request = {
    body: {},
    params: {},
    query: {}
  } as Request;
  const res: Response = {} as Response;
  const mockJson = jest.fn();
  res.status = jest.fn().mockReturnValue({ ...res, json: mockJson });

  beforeEach(() => {
    controller = new OrderController();
  });

  describe('Should sendOrder', () => {
    it('with successfull response', () => {
      req.body = mockOrder;
      jest.spyOn(RequestMiddleware, 'areRequestParamsValid').mockReturnValue(true);

      // Trigger controller method + controls
      controller.sendOrder(req, res);
      expect(mockOrderService.sendOrder).toHaveBeenCalledWith(mockOrder);
      expect(mockCartService.clearCart).toHaveBeenCalledWith();
      expect(res.status).toHaveBeenCalledWith(serviceResponseConstantes.SUCCESS.code);
      expect(mockJson).toHaveBeenCalledWith({ isOrderValid: true });
    });

    it('with atleast a missing request param', () => {
      req.body = mockOrder;
      jest.spyOn(RequestMiddleware, 'areRequestParamsValid').mockReturnValue(false);

      // Trigger controller method + controls
      controller.sendOrder(req, res);
      expect(mockOrderService.sendOrder).not.toHaveBeenCalled();
      expect(mockCartService.clearCart).not.toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
      expect(mockJson).not.toHaveBeenCalled();
    });

    it('with ann error on service call', () => {
      // Override sendOrder spy
      mockOrderService.sendOrder.mockReturnValue(throwError(() => serviceResponseConstantes.BAD_REQUEST));

      req.body = mockOrder;
      jest.spyOn(RequestMiddleware, 'areRequestParamsValid').mockReturnValue(true);

      const expectedError = {
        isOrderValid: false,
        errors: [`Error ${serviceResponseConstantes.BAD_REQUEST.code}: ${serviceResponseConstantes.BAD_REQUEST.description}`]
      };

      // Trigger controller method + controls
      controller.sendOrder(req, res);
      expect(mockOrderService.sendOrder).toHaveBeenCalledWith(mockOrder);
      expect(mockCartService.clearCart).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(serviceResponseConstantes.BAD_REQUEST.code);
      expect(mockJson).toHaveBeenCalledWith(expectedError);
    });
  });
});
