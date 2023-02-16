import { of } from "rxjs";
import FileNameEnum from "../enums/file-name.enum";
import CartLineDto from "../interfaces/cart-line";
import { mockCarts } from "../mocks/cart-mock";
import { mockMapleSyrups } from "../mocks/maple-syrup.mock";
import CartService from "./cart-service";

// Mock FileService
const mockFileService = {
    readFile: jest.fn().mockReturnValue(of(mockCarts)),
    addElementInFile: jest.fn().mockReturnValue(of()),
    updateFile: jest.fn().mockReturnValue(of()),
}
jest.mock('./file-service.ts', () => {
    return jest.fn().mockImplementation(() => ({
        readFile: mockFileService.readFile,
        addElementInFile: mockFileService.addElementInFile,
        updateFile: mockFileService.updateFile,
    }));
});

// Mock ProductService
const mockProductService = { 
    getMapleSyrupDetail: jest.fn().mockReturnValue(of(mockMapleSyrups[0]))
}
jest.mock('./product-service.ts', () => {
    return jest.fn().mockImplementation(() => ({
        getMapleSyrupDetail: mockProductService.getMapleSyrupDetail,
    }));
});

describe('CartService', () => {
    let service: CartService;

    beforeEach(() => {
        service = new CartService();
    })

    it('Should getCart', () => {
        service.getCart().subscribe((carts) => {
            expect(carts).toStrictEqual(mockCarts);
            expect(mockFileService.readFile).toHaveBeenCalledWith(FileNameEnum.cart)
        });        
    });

    describe('Should putProductToCart ', () => {
        it(`with a product that isn't in cart but who exists`, async () => {
            const expectedLine: CartLineDto = {
                productId: '003',
                name: `Sirop d'érable doré - Dorica`,
                image: `mockImg`,
                price: 9.50,
                qty: 1,
            }

            service.putProductToCart('003').subscribe({
                next: () => {
                    expect(mockFileService.addElementInFile).toHaveBeenCalledWith(FileNameEnum.cart, expectedLine)
                }
            });
        })

        it('with a product that already is in cart', () => {
            service.putProductToCart('001').subscribe({
                error: (errorValue) => {
                    expect(errorValue).toEqual({ code: 400, description: 'The product #001 is already in cart' });
                    expect(mockFileService.addElementInFile).not.toHaveBeenCalled()
                }
            });
        });

        it(`with a product that isn't in cart and who don't exists`, async () => {
            // Override getMapleSyrup spy
            mockProductService.getMapleSyrupDetail.mockReturnValue((of(undefined)))

            service.putProductToCart('999').subscribe({
                error: (errorValue) => {
                    expect(errorValue).toEqual({ code: 400, description: `The product #999 doesn't exists in catalogue` });
                    expect(mockFileService.addElementInFile).not.toHaveBeenCalled()
                }
            });
        })
    })

    describe('Should deleteProductFromCart ', () => {
        it('with a product contained in cart', () => {
            const expectedRemainingLines: CartLineDto[] = [{
                productId: '006',
                name: `Sirop d'érable en conserve`,
                image: `mockImg`,
                price: 10.90,
                qty: 3,
            }];

            service.deleteProductFromCart('001').subscribe({
                next: () => {
                    expect(mockFileService.updateFile).toHaveBeenCalledWith(FileNameEnum.cart, expectedRemainingLines)
                }
            })
        })

        it('with a product not contained in cart', () => {
            service.deleteProductFromCart('003').subscribe({
                error: (errorValue) => {
                    expect(errorValue).toEqual({ code: 400, description: `The product #003 isn't in cart` });
                    expect(mockFileService.addElementInFile).not.toHaveBeenCalled()
                }
            })
        })
    })

    describe('Should patchProductFromCart ', () => {
        it('with a product contained in cart', () => {
            const expectedLines: CartLineDto[] = [
                {
                    productId: '001',
                    name: `Sirop d'érable doré - Dorica`,
                    image: `mockImg`,
                    price: 9.50,
                    qty: 5,
                },
                {
                    productId: '006',
                    name: `Sirop d'érable en conserve`,
                    image: `mockImg`,
                    price: 10.90,
                    qty: 3,
                }
            ];

            service.patchProductFromCart('001', 5).subscribe({
                next: () => {
                    expect(mockFileService.updateFile).toHaveBeenCalledWith(FileNameEnum.cart, expectedLines)
                }
            })
        })

        it('with a product not contained in cart', () => {
            service.patchProductFromCart('003', 5).subscribe({
                error: (errorValue) => {
                    expect(errorValue).toEqual({ code: 400, description: `The product #003 isn't in cart` });
                    expect(mockFileService.addElementInFile).not.toHaveBeenCalled()
                }
            })
        })
    })

    it('Should clearCart', () => {
        service.clearCart().subscribe(() => {
            expect(mockFileService.updateFile).toHaveBeenCalledWith(FileNameEnum.cart, [])
        });
    })
});