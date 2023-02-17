import axios from 'axios';
import CatalogueItemTypeEnum from '../enums/catalogue-item-type.enum';
import { environment } from '../env/environment';
import CatalogueItemDto from '../interfaces/catalogue-item';

export function getProducts(type?: CatalogueItemTypeEnum) {
  const queryParams = type ? `?type=${type}` : '';
  return axios.get<CatalogueItemDto[]>(`${environment.apiBasePath}products${queryParams}`);
}

export function getProductDetail(productId: string) {
  return axios.get(`${environment.apiBasePath}products/${productId}`);
}
