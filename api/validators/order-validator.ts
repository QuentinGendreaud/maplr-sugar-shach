import { body, ValidationChain } from 'express-validator';

class OrderValidator {
  public static checkPostOrder(): ValidationChain[] {
    return [body().isArray()];
  }
}
export default OrderValidator;
