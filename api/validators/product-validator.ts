import { param, query, ValidationChain } from 'express-validator';

class ProductValidator {
    public static checkGetProductFromType(): ValidationChain[] {
        return [
            query('type').optional().isString()
        ]
    }
    
    public static checkGetProductElement(): ValidationChain[] {
        return [
            param('productId').isString()
        ]
    }
}
export default ProductValidator