import { Observable, mergeMap, throwError } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';
import { serviceResponseConstantes } from '../constants/service-response.const';
import FileNameEnum from '../enums/file-name.enum';
import CartLineDto from '../interfaces/cart-line';
import ServiceResponse from '../interfaces/service-response';
import FileService from './file-service';
import ProductService from './product-service';

class CartService {
    private readonly fileService = new FileService();
    private readonly productService = new ProductService();

    public getCart (): Observable<CartLineDto[]> {
        return this.fileService.readFile(FileNameEnum.cart);
    }

    public putProductToCart (productId: string): Observable<void> {
        return this.getCart().pipe(
            mergeMap((cartLines) => {
                const isInCart = cartLines.find((product) => product.productId === productId);
                if (isInCart) {
                    // Product is already in cart, we should throw an error
                    const formattedError: ServiceResponse = {
                        code: serviceResponseConstantes.BAD_REQUEST.code,
                        description: `The product #${productId} is already in cart`
                    };
                    return throwError(() => formattedError)
                } else {
                    // Get the productLine to be added
                    return this.initCartLine(productId);
                }
            }),
            mergeMap((productLine) => {
                // Add the new product line in cart
                return this.fileService.addElementInFile(FileNameEnum.cart, productLine)
            })
        );
    }

    public deleteProductFromCart(productId: string): Observable<void> {
        return this.getCart().pipe(
            mergeMap((cartLines) => {
                // Remove product with received productId from productLines
                const filteredLines = cartLines.filter((cartLine) => cartLine.productId !== productId);

                if (filteredLines.length === cartLines.length) {
                    // Throw an error: No line match received productId in cart                
                    const formattedError: ServiceResponse = {
                        code: serviceResponseConstantes.BAD_REQUEST.code,
                        description: `The product #${productId} isn't in cart`
                    };
                    return throwError(() => formattedError)
                } else {
                    return of(filteredLines)
                }
            }),
            mergeMap((remainingCartLines) => {
                // Update JSON file with updated cart list
                return this.fileService.updateFile(FileNameEnum.cart, remainingCartLines)
            })
        )
    }

    public patchProductFromCart(productId: string, newQuantity: number): Observable<void> {
        return this.getCart().pipe(
            mergeMap((cartLines) => {
                // Get productLine that match received productId
                const updatedLineIndex = cartLines.findIndex((cartLine) => cartLine.productId === productId);

                if (updatedLineIndex !== -1) {
                    // The product have been found, we update it and then we update file
                    let updatedCartLines = [...cartLines];
                    cartLines[updatedLineIndex].qty = newQuantity;
                    return of(updatedCartLines);
                } else {
                    // Throw an error: No line match received productId in cart                
                    const formattedError: ServiceResponse = {
                        code: serviceResponseConstantes.BAD_REQUEST.code,
                        description: `The product #${productId} isn't in cart`
                    };
                    return throwError(() => formattedError)
                }
            }),
            mergeMap((remainingCartLines) => {
                // Update JSON file with updated cart list
                return this.fileService.updateFile(FileNameEnum.cart, remainingCartLines)
            })
        )
    }

    public clearCart(): Observable<void> {
        return this.fileService.updateFile(FileNameEnum.cart, []);
    }

    private initCartLine(productId: string): Observable<CartLineDto> {
        return this.productService.getMapleSyrupDetail(productId).pipe(
            mergeMap((mapleSyrup) => {
                if (mapleSyrup) {
                    // Prepare new chartLine
                    const newChartLine: CartLineDto = {
                        productId,
                        image: mapleSyrup.image,
                        name: mapleSyrup.name,
                        price: mapleSyrup.price,
                        qty: 1
                    };
                    return of(newChartLine);
                } else {
                    // The product doesn't exists, should throw an error
                    const formattedError: ServiceResponse = {
                        code: serviceResponseConstantes.BAD_REQUEST.code,
                        description: `The product #${productId} doesn't exists in catalogue`
                    };
                    return throwError(() => formattedError)
                }
            })
        )
    }
}

export default CartService;