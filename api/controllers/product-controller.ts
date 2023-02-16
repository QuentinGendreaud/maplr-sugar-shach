import { Request, Response } from 'express';
import { serviceResponseConstantes } from '../constants/service-response.const';
import CatalogueItemTypeEnum from '../enums/catalogue-item-type.enum';
import ServiceResponse from '../interfaces/service-response';
import RequestMiddleware from '../middlewares/request-middleware';
import ProductService from '../services/product-service';
import { getCorrespondingSyropType } from '../utils/utils-function';

class ProductController {
  private readonly productService = new ProductService();

  public getCatalogueItems(req: Request, res: Response) {
    if (RequestMiddleware.areRequestParamsValid(req, res)) {
      const syrupType: CatalogueItemTypeEnum = getCorrespondingSyropType(req.query.type?.toString());
      this.productService.getCatalogueItems(syrupType).subscribe({
        next: (products) => res.status(serviceResponseConstantes.SUCCESS.code).json(products),
        error: (error: ServiceResponse) => res.status(error.code).json(error)
      });
    }
  }

  public getMapleSyrupDetail(req: Request, res: Response) {
    if (RequestMiddleware.areRequestParamsValid(req, res)) {
      const productId = req.params.productId;

      this.productService.getMapleSyrupDetail(productId).subscribe({
        next: (product) => res.status(serviceResponseConstantes.SUCCESS.code).json(product),
        error: (error: ServiceResponse) => res.status(error.code).json(error)
      });
    }
  }
}

export default ProductController;
