import axios from 'axios';
import { environment } from '../env/environment';

export function getCart() {
  return axios.get(`${environment.apiBasePath}cart`);
}

export function addItemToCart(productId: string) {
  return axios.put(`${environment.apiBasePath}cart?productId=${productId}`);
}

export function updateCart(productId: string, quantity: number) {
  return axios.patch(`${environment.apiBasePath}cart?productId=${productId}&newQty=${quantity}`);
}

export function removeItemFromCart(productId: string) {
  return axios.delete(`${environment.apiBasePath}cart?productId=${productId}`);
}
