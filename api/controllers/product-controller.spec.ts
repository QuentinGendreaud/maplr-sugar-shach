import { of, throwError } from 'rxjs';
import { Request, Response } from 'express';
import { serviceResponseConstantes } from '../constants/service-response.const';
import RequestMiddleware from '../middlewares/request-middleware';
import ProductController from './product-controller';
import { mockCatalogueSyrups } from '../mocks/catalogue-mock';
import CatalogueItemTypeEnum from '../enums/catalogue-item-type.enum';
import { mockMapleSyrups } from '../mocks/maple-syrup.mock';

// Mock ProductService
const mockProductService = {
  getCatalogueItems: jest.fn().mockReturnValue(of(mockCatalogueSyrups)),
  getMapleSyrupDetail: jest.fn().mockReturnValue(of(mockMapleSyrups[0]))
};
jest.mock('../services/product-service', () => {
  return jest.fn().mockImplementation(() => ({
    getCatalogueItems: mockProductService.getCatalogueItems,
    getMapleSyrupDetail: mockProductService.getMapleSyrupDetail
  }));
});

describe('ProductController', () => {
  let controller: ProductController;

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
    controller = new ProductController();
  });

  describe('Should getCatalogueItems', () => {
    it('with successfull response (with no query param)', () => {
      jest.spyOn(RequestMiddleware, 'areRequestParamsValid').mockReturnValue(true);

      // Trigger controller method + controls
      controller.getCatalogueItems(req, res);
      expect(mockProductService.getCatalogueItems).toHaveBeenCalledWith(undefined);
      expect(res.status).toHaveBeenCalledWith(serviceResponseConstantes.SUCCESS.code);
      expect(mockJson).toHaveBeenCalledWith(mockCatalogueSyrups);
    });

    it('with atleast a missing request param', () => {
      jest.spyOn(RequestMiddleware, 'areRequestParamsValid').mockReturnValue(false);

      // Trigger controller method + controls
      controller.getCatalogueItems(req, res);
      expect(mockProductService.getCatalogueItems).not.toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
      expect(mockJson).not.toHaveBeenCalled();
    });

    it('with successfull response (with type query param)', () => {
      req.query = { type: 'amber' };
      jest.spyOn(RequestMiddleware, 'areRequestParamsValid').mockReturnValue(true);

      // Trigger controller method + controls
      controller.getCatalogueItems(req, res);
      expect(mockProductService.getCatalogueItems).toHaveBeenCalledWith(CatalogueItemTypeEnum.amber);
      expect(res.status).toHaveBeenCalledWith(serviceResponseConstantes.SUCCESS.code);
      expect(mockJson).toHaveBeenCalledWith(mockCatalogueSyrups);
    });

    it('with an error in service call', () => {
      // Override getCatalogueItems spy
      mockProductService.getCatalogueItems.mockReturnValue(throwError(() => serviceResponseConstantes.BAD_REQUEST));

      req.query = { type: 'amber' };
      jest.spyOn(RequestMiddleware, 'areRequestParamsValid').mockReturnValue(true);

      // Trigger controller method + controls
      controller.getCatalogueItems(req, res);
      expect(mockProductService.getCatalogueItems).toHaveBeenCalledWith(CatalogueItemTypeEnum.amber);
      expect(res.status).toHaveBeenCalledWith(serviceResponseConstantes.BAD_REQUEST.code);
      expect(mockJson).toHaveBeenCalledWith(serviceResponseConstantes.BAD_REQUEST);
    });
  });

  describe('Should getMapleSyrupDetail', () => {
    it('with successfull response', () => {
      req.params = { productId: '001' };
      jest.spyOn(RequestMiddleware, 'areRequestParamsValid').mockReturnValue(true);

      // Trigger controller method + controls
      controller.getMapleSyrupDetail(req, res);
      expect(mockProductService.getMapleSyrupDetail).toHaveBeenCalledWith('001');
      expect(res.status).toHaveBeenCalledWith(serviceResponseConstantes.SUCCESS.code);
      expect(mockJson).toHaveBeenCalledWith(mockMapleSyrups[0]);
    });

    it('with atleast a missing request param', () => {
      jest.spyOn(RequestMiddleware, 'areRequestParamsValid').mockReturnValue(false);

      // Trigger controller method + controls
      controller.getMapleSyrupDetail(req, res);
      expect(mockProductService.getMapleSyrupDetail).not.toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
      expect(mockJson).not.toHaveBeenCalled();
    });

    it('with an error in service call', () => {
      // Override getMapleSyrupDetail spy
      mockProductService.getMapleSyrupDetail.mockReturnValue(throwError(() => serviceResponseConstantes.BAD_REQUEST));

      req.query = { productId: '001' };
      jest.spyOn(RequestMiddleware, 'areRequestParamsValid').mockReturnValue(true);

      // Trigger controller method + controls
      controller.getMapleSyrupDetail(req, res);
      expect(mockProductService.getMapleSyrupDetail).toHaveBeenCalledWith('001');
      expect(res.status).toHaveBeenCalledWith(serviceResponseConstantes.BAD_REQUEST.code);
      expect(mockJson).toHaveBeenCalledWith(serviceResponseConstantes.BAD_REQUEST);
    });
  });
});
