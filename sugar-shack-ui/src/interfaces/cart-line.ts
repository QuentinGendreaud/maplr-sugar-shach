interface CartLineDto {
  productId: string;
  name: string;
  image: string;
  price: number;
  qty: number;
  totalPrice?: number;
}

export default CartLineDto;
