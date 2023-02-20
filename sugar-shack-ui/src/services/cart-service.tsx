import axios from 'axios';
import { environment } from '../env/environment';
import CartLineDto from '../interfaces/cart-line';

export function getCart() {
  return axios.get<CartLineDto[]>(`${environment.apiBasePath}cart`);
}

export function addItemToCart(productId: string) {
  return axios.put<void>(`${environment.apiBasePath}cart?productId=${productId}`);
}

export function updateCart(productId: string, quantity: number) {
  return axios.patch<void>(`${environment.apiBasePath}cart?productId=${productId}&newQty=${quantity}`);
}

export function removeItemFromCart(productId: string) {
  return axios.delete<void>(`${environment.apiBasePath}cart?productId=${productId}`);
}
