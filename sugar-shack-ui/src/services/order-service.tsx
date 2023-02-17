import axios from 'axios';
import { environment } from '../env/environment';

export function sendOrder(order: any) {
  return axios.post(`${environment.apiBasePath}order`, order);
}
