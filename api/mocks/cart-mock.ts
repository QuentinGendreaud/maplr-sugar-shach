import CartLineDto from '../interfaces/cart-line';

export const mockCarts: CartLineDto[] = [
  {
    productId: '001',
    name: `Sirop d'érable doré - Dorica`,
    image: `mockImg`,
    price: 9.5,
    qty: 10
  },
  {
    productId: '006',
    name: `Sirop d'érable en conserve`,
    image: `mockImg`,
    price: 10.9,
    qty: 3
  }
];
