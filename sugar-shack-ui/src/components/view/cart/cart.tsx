import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import CartLineDto from '../../../interfaces/cart-line';
import OrderLineDto from '../../../interfaces/order-line';
import { getCart, removeItemFromCart } from '../../../services/cart-service';
import { sendOrder } from '../../../services/order-service';
import BackButton from '../../back-button/back-button';
import FormattedAmount from '../../formatted-amount/formatted-amount';
import Loader from '../../loader/loader';
import './cart.scss';

function Cart() {
  const [totalCartPrice, setTotalCartPrice] = useState<number>(0);
  const [cartItems, setCartItems] = useState<CartLineDto[] | undefined>(undefined);
  useEffect(() => {
    getCart().then((res) => {
      let totalPrice = 0;
      res.data.map((line) => {
        line.totalPrice = calculateLineTotalPrice(line);
        totalPrice += line.totalPrice;
      });
      setTotalCartPrice(totalPrice);
      return setCartItems(res.data);
    });
  }, []);

  const convertCartLineToOrderLine = function (cartLines: CartLineDto[]): OrderLineDto[] {
    return cartLines.map((line) => ({ producId: line.productId, qty: line.qty }));
  };

  const calculateLineTotalPrice = function (line: CartLineDto): number {
    return line.price * line.qty;
  };

  const removeLineFormCart = function (productId: string) {
    removeItemFromCart(productId).then(() => {
      const remainingLines = cartItems?.filter((line) => line.productId !== productId);
      setCartItems(remainingLines);
    });
  };

  return (
    <div>
      <BackButton />
      <div>
        <h1>Cart View :</h1>
        {cartItems === undefined ? (
          <Loader />
        ) : (
          <div>
            {cartItems.length === 0 ? (
              <div>There are no product in the cart yet</div>
            ) : (
              <div className="cart-container">
                {/* Cart list header */}
                <Row className="cart-header">
                  <Col md={5}>Description</Col>
                  <Col md={2}>Quantity</Col>
                  <Col md={2}>Price</Col>
                  <Col md={2}>Total Price</Col>
                  <Col md={1}>Actions</Col>
                </Row>

                {/* Cart elements */}
                <div className="cart-list">
                  {cartItems.map((cartItem) => (
                    <Row className="cart-element" key={cartItem.productId}>
                      <Col md={5}>
                        {/* img + title */}
                        <Row>
                          <Col md="auto">
                            <img src={cartItem.image} alt="image of the product" className="product-image" />
                          </Col>
                          <Col md="auto">{cartItem.name}</Col>
                        </Row>
                        {/* {cartItem.name} */}
                      </Col>
                      <Col md={2}>{cartItem.qty}</Col>
                      <Col md={2}>
                        <FormattedAmount amount={cartItem.price} />
                      </Col>
                      <Col md={2}>
                        <FormattedAmount amount={cartItem.totalPrice as number} />
                      </Col>
                      <Col md={1}>
                        <Button
                          onClick={() => {
                            removeLineFormCart(cartItem.productId);
                          }}
                        >
                          X
                        </Button>
                      </Col>
                    </Row>
                  ))}
                </div>

                <div className="total-cart-price">
                  <strong>Total Price: </strong>
                  <FormattedAmount amount={totalCartPrice} />
                </div>

                <div className="cart-actions">
                  <Button
                    onClick={() => {
                      console.log('try to update data');
                      const orderLines = convertCartLineToOrderLine(cartItems);
                      sendOrder(orderLines).then(() => {
                        setCartItems([]);
                      });
                    }}
                  >
                    Send Cart
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
