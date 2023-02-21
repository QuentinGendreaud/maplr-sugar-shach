import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import AlertTypeEnum from '../../../enums/alert-type.enum';
import AlertMessageModel from '../../../interfaces/alert-message';
import CartLineDto from '../../../interfaces/cart-line';
import OrderLineDto from '../../../interfaces/order-line';
import { getCart, removeItemFromCart } from '../../../services/cart-service';
import { sendOrder } from '../../../services/order-service';
import AlertMessage from '../../shared/alert-message/alert-message';
import BackButton from '../../shared/back-button/back-button';
import FormattedAmount from '../../shared/formatted-amount/formatted-amount';
import Loader from '../../shared/loader/loader';
import './cart.scss';

function Cart() {
  const [alertMessage, setAlertMessage] = useState<AlertMessageModel>();
  const [totalCartPrice, setTotalCartPrice] = useState<number>(0);
  const [cartItems, setCartItems] = useState<CartLineDto[] | undefined>(undefined);
  useEffect(() => {
    getCart()
      .then((res) => {
        let totalPrice = 0;
        res.data.map((line) => {
          line.totalPrice = calculateLineTotalPrice(line);
          totalPrice += line.totalPrice;
        });
        setTotalCartPrice(totalPrice);
        return setCartItems(res.data);
      })
      .catch(() => {
        setAlertMessage({
          alertType: AlertTypeEnum.danger,
          description: 'Failed to load cart items',
          title: 'Error'
        });
      });
  }, []);

  const convertCartLineToOrderLine = function (cartLines: CartLineDto[]): OrderLineDto[] {
    return cartLines.map((line) => ({ producId: line.productId, qty: line.qty }));
  };

  const calculateLineTotalPrice = function (line: CartLineDto): number {
    return line.price * line.qty;
  };

  const removeLineFormCart = function (productId: string): Promise<void> {
    return removeItemFromCart(productId)
      .then(() => {
        const remainingLines = cartItems?.filter((line) => line.productId !== productId);
        setCartItems(remainingLines);
        setAlertMessage({
          alertType: AlertTypeEnum.success,
          description: 'The item has been removed from cart',
          title: 'Success'
        });
      })
      .catch(() => {
        setAlertMessage({
          alertType: AlertTypeEnum.danger,
          description: 'Failed to remove the item from the cart',
          title: 'Error'
        });
      });
  };

  return (
    <div>
      {alertMessage ? (
        <AlertMessage title={alertMessage.title} description={alertMessage.description} alertType={alertMessage.alertType} />
      ) : (
        <div></div>
      )}
      <BackButton />
      <div>
        <h1>Cart View :</h1>
        {cartItems === undefined ? (
          <Loader />
        ) : (
          <div>
            {cartItems.length === 0 ? (
              <div>There is no product in the cart</div>
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
                        <Row>
                          <Col md="auto">
                            <img src={cartItem.image} alt="image of the product" className="product-image" />
                          </Col>
                          <Col md="auto">{cartItem.name}</Col>
                        </Row>
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
                      const orderLines = convertCartLineToOrderLine(cartItems);
                      sendOrder(orderLines)
                        .then(() => {
                          setCartItems([]);
                          setAlertMessage({ alertType: AlertTypeEnum.success, description: 'Your order has been sent', title: 'Success' });
                        })
                        .catch(() => {
                          setAlertMessage({
                            alertType: AlertTypeEnum.danger,
                            description: 'Failed to send your order',
                            title: 'Error'
                          });
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
