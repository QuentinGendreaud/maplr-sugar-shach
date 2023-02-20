import axios from 'axios';
import { environment } from '../env/environment';
import OrderLineDto from '../interfaces/order-line';

export function sendOrder(order: OrderLineDto[]) {
  return axios.post<void>(`${environment.apiBasePath}order`, order);
}
