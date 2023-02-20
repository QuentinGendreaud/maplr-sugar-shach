import React, { useEffect, useState } from 'react';
import MapleSyrupDto from '../../../interfaces/maple-syrup';
import { getProductDetail } from '../../../services/product-service';
import './product-detail.scss';
import { useParams } from 'react-router-dom';
import { addItemToCart, getCart, updateCart } from '../../../services/cart-service';
import Card from 'react-bootstrap/esm/Card';
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/esm/Form';
import BackButton from '../../shared/back-button/back-button';
import Loader from '../../shared/loader/loader';
import FormattedAmount from '../../shared/formatted-amount/formatted-amount';
import AlertMessageModel from '../../../interfaces/alert-message';
import AlertTypeEnum from '../../../enums/alert-type.enum';
import AlertMessage from '../../shared/alert-message/alert-message';

function ProductDetail(): JSX.Element {
  const { productId } = useParams();
  const [alertMessage, setAlertMessage] = useState<AlertMessageModel>();
  const [quantity, setQuantity] = useState<number>(0);
  const [productDetail, setProductDetail] = useState<MapleSyrupDto>();

  useEffect(() => {
    getProductDetail(productId as string)
      .then((res) => {
        return setProductDetail(res.data);
      })
      .catch(() => {
        setAlertMessage({
          alertType: AlertTypeEnum.danger,
          description: 'Failed to load product details',
          title: 'Error'
        });
      });
    getCart()
      .then((res) => {
        const productLineInCart = res.data.find((line) => line.productId === productId);
        if (productLineInCart) {
          setQuantity(productLineInCart.qty);
        }
      })
      .catch(() => {
        setAlertMessage({
          alertType: AlertTypeEnum.danger,
          description: 'Failed to load cart details',
          title: 'Error'
        });
      });
  }, []);

  return (
    <div>
      {alertMessage ? (
        <AlertMessage title={alertMessage.title} description={alertMessage.description} alertType={alertMessage.alertType} />
      ) : (
        <div></div>
      )}
      <BackButton />
      <div>
        <h1>Product detail: </h1>
        {!productDetail ? (
          <Loader />
        ) : (
          <Card>
            <div className="card-content">
              {/* Display product image, name and description */}
              <Card.Img variant="top" src={productDetail.image} />
              <Card.Body>
                <Card.Title>{productDetail.name}</Card.Title>
                <Card.Text>{productDetail.description}</Card.Text>
                <div>
                  <div>
                    <strong>Price: </strong> <FormattedAmount amount={productDetail.price} />
                  </div>
                  <div>
                    <strong>Stock: </strong> {productDetail.stock}
                  </div>

                  <div className="cart-container">
                    {quantity > 0 ? (
                      // Template when product is alreay in cart
                      <div className="cart-action">
                        <Button
                          variant="primary"
                          disabled={productDetail.stock === 0}
                          onClick={() => {
                            updateCart(productDetail.id, quantity);
                          }}
                        >
                          Update quantity
                        </Button>
                        <div className="cart-action-quantity">
                          <Button disabled={quantity === 1} onClick={() => setQuantity(quantity - 1)}>
                            -
                          </Button>
                          <Form.Control
                            type="number"
                            value={quantity}
                            max={productDetail.stock}
                            min={1}
                            onChange={(event) => {
                              if (event.target.value) {
                                setQuantity(parseInt(event.target.value));
                              }
                            }}
                          />
                          <Button disabled={quantity === productDetail.stock} onClick={() => setQuantity(quantity + 1)}>
                            +
                          </Button>
                        </div>
                      </div>
                    ) : (
                      // Template when product isn't in cart
                      <div className="cart-action">
                        <Button
                          variant="primary"
                          disabled={productDetail.stock === 0}
                          onClick={() => {
                            addItemToCart(productDetail.id)
                              .then(() => {
                                setQuantity(1);
                                setAlertMessage({
                                  alertType: AlertTypeEnum.success,
                                  description: 'The item has been added to your cart',
                                  title: 'Success'
                                });
                              })
                              .catch(() => {
                                setAlertMessage({
                                  alertType: AlertTypeEnum.danger,
                                  description: 'Failed add the item in the cart',
                                  title: 'Error'
                                });
                              });
                          }}
                        >
                          Add to cart
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </Card.Body>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

export default ProductDetail;
