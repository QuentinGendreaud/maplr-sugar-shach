import { query, ValidationChain } from 'express-validator';

class CartValidator {
  public static checkPutCart(): ValidationChain[] {
    return [query('productId').isString()];
  }

  public static checkDeleteCart(): ValidationChain[] {
    return [query('productId').isString()];
  }

  public static checkPatchCart(): ValidationChain[] {
    return [query('productId').isString(), query('newQty').isNumeric()];
  }
}
export default CartValidator;
