import { of, throwError } from 'rxjs';
import { Request, Response } from 'express';
import CartController from './cart-controller';
import { serviceResponseConstantes } from '../constants/service-response.const';
import RequestMiddleware from '../middlewares/request-middleware';

// Mock CartService
const mockCartService = {
  getCart: jest.fn().mockReturnValue(of([])),
  putProductToCart: jest.fn().mockReturnValue(of(undefined)),
  deleteProductFromCart: jest.fn().mockReturnValue(of(undefined)),
  patchProductFromCart: jest.fn().mockReturnValue(of(undefined))
};
jest.mock('../services/cart-service', () => {
  return jest.fn().mockImplementation(() => ({
    getCart: mockCartService.getCart,
    putProductToCart: mockCartService.putProductToCart,
    deleteProductFromCart: mockCartService.deleteProductFromCart,
    patchProductFromCart: mockCartService.patchProductFromCart
  }));
});

describe('CartController', () => {
  let controller: CartController;

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
    controller = new CartController();
  });

  describe('Should getCart', () => {
    it('with successfull response', () => {
      // Trigger controller method + controls
      controller.getCart(res);
      expect(mockCartService.getCart).toHaveBeenCalledWith();
      expect(res.status).toHaveBeenCalledWith(serviceResponseConstantes.SUCCESS.code);
      expect(mockJson).toHaveBeenCalledWith([]);
    });

    it('with an error', () => {
      // Override getCart spy
      mockCartService.getCart.mockReturnValue(throwError(() => serviceResponseConstantes.BAD_REQUEST));

      // Trigger controller method + controls
      controller.getCart(res);
      expect(mockCartService.getCart).toHaveBeenCalledWith();
      expect(res.status).toHaveBeenCalledWith(serviceResponseConstantes.BAD_REQUEST.code);
      expect(mockJson).toHaveBeenCalledWith(serviceResponseConstantes.BAD_REQUEST);
    });
  });

  describe('Should putProductToCart', () => {
    it('with successfull response', () => {
      req.query = { productId: '1' };
      jest.spyOn(RequestMiddleware, 'areRequestParamsValid').mockReturnValue(true);

      // Trigger controller method + controls
      controller.putProductToCart(req, res);
      expect(mockCartService.putProductToCart).toHaveBeenCalledWith('1');
      expect(res.status).toHaveBeenCalledWith(serviceResponseConstantes.ACCEPTED.code);
      expect(mockJson).toHaveBeenCalledWith();
    });

    it('with atleast a missing request param', () => {
      req.query = { productId: '1' };
      jest.spyOn(RequestMiddleware, 'areRequestParamsValid').mockReturnValue(false);

      // Trigger controller method + controls
      controller.putProductToCart(req, res);
      expect(mockCartService.putProductToCart).not.toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
      expect(mockJson).not.toHaveBeenCalled();
    });

    it('with an error in service call', () => {
      // Override putProductToCart spy
      mockCartService.putProductToCart.mockReturnValue(throwError(() => serviceResponseConstantes.BAD_REQUEST));

      req.query = { productId: '1' };
      jest.spyOn(RequestMiddleware, 'areRequestParamsValid').mockReturnValue(true);

      // Trigger controller method + controls
      controller.putProductToCart(req, res);
      expect(mockCartService.putProductToCart).toHaveBeenCalledWith('1');
      expect(res.status).toHaveBeenCalledWith(serviceResponseConstantes.BAD_REQUEST.code);
      expect(mockJson).toHaveBeenCalledWith(serviceResponseConstantes.BAD_REQUEST);
    });
  });

  describe('Should deleteProductFromCart', () => {
    it('with successfull response', () => {
      req.query = { productId: '1' };
      jest.spyOn(RequestMiddleware, 'areRequestParamsValid').mockReturnValue(true);

      // Trigger controller method + controls
      controller.deleteProductFromCart(req, res);
      expect(mockCartService.deleteProductFromCart).toHaveBeenCalledWith('1');
      expect(res.status).toHaveBeenCalledWith(serviceResponseConstantes.ACCEPTED.code);
      expect(mockJson).toHaveBeenCalledWith();
    });

    it('with atleast a missing request param', () => {
      req.query = { productId: '1' };
      jest.spyOn(RequestMiddleware, 'areRequestParamsValid').mockReturnValue(false);

      // Trigger controller method + controls
      controller.deleteProductFromCart(req, res);
      expect(mockCartService.deleteProductFromCart).not.toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
      expect(mockJson).not.toHaveBeenCalled();
    });

    it('with an error in service call', () => {
      // Override deleteProductFromCart spy
      mockCartService.deleteProductFromCart.mockReturnValue(throwError(() => serviceResponseConstantes.BAD_REQUEST));

      req.query = { productId: '1' };
      jest.spyOn(RequestMiddleware, 'areRequestParamsValid').mockReturnValue(true);

      // Trigger controller method + controls
      controller.deleteProductFromCart(req, res);
      expect(mockCartService.deleteProductFromCart).toHaveBeenCalledWith('1');
      expect(res.status).toHaveBeenCalledWith(serviceResponseConstantes.BAD_REQUEST.code);
      expect(mockJson).toHaveBeenCalledWith(serviceResponseConstantes.BAD_REQUEST);
    });
  });

  describe('Should patchProductFromCart', () => {
    it('with successfull response', () => {
      req.query = { productId: '1', newQty: '5' };
      jest.spyOn(RequestMiddleware, 'areRequestParamsValid').mockReturnValue(true);

      // Trigger controller method + controls
      controller.patchProductFromCart(req, res);
      expect(mockCartService.patchProductFromCart).toHaveBeenCalledWith('1', 5);
      expect(res.status).toHaveBeenCalledWith(serviceResponseConstantes.ACCEPTED.code);
      expect(mockJson).toHaveBeenCalledWith();
    });

    it('with atleast a missing request param', () => {
      req.query = { productId: '1', newQty: '5' };
      jest.spyOn(RequestMiddleware, 'areRequestParamsValid').mockReturnValue(false);

      // Trigger controller method + controls
      controller.patchProductFromCart(req, res);
      expect(mockCartService.patchProductFromCart).not.toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
      expect(mockJson).not.toHaveBeenCalled();
    });

    it('with an error in service call', () => {
      // Override patchProductFromCart spy
      mockCartService.patchProductFromCart.mockReturnValue(throwError(() => serviceResponseConstantes.BAD_REQUEST));

      req.query = { productId: '1', newQty: '5' };
      jest.spyOn(RequestMiddleware, 'areRequestParamsValid').mockReturnValue(true);

      // Trigger controller method + controls
      controller.patchProductFromCart(req, res);
      expect(mockCartService.patchProductFromCart).toHaveBeenCalledWith('1', 5);
      expect(res.status).toHaveBeenCalledWith(serviceResponseConstantes.BAD_REQUEST.code);
      expect(mockJson).toHaveBeenCalledWith(serviceResponseConstantes.BAD_REQUEST);
    });
  });
});
