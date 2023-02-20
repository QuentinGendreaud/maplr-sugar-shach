import React, { useEffect, useState } from 'react';
import MapleSyrupDto from '../../../interfaces/maple-syrup';
import { getProductDetail } from '../../../services/product-service';
import './product-detail.scss';
import { useParams } from 'react-router-dom';
import { addItemToCart, getCart, updateCart } from '../../../services/cart-service';
import Card from 'react-bootstrap/esm/Card';
import Button from 'react-bootstrap/esm/Button';
import Loader from '../../loader/loader';
import BackButton from '../../back-button/back-button';
import Form from 'react-bootstrap/esm/Form';
import FormattedAmount from '../../formatted-amount/formatted-amount';

function ProductDetail(): JSX.Element {
  const { productId } = useParams();
  const [quantity, setQuantity] = useState<number>(0);
  const [productDetail, setProductDetail] = useState<MapleSyrupDto>();

  useEffect(() => {
    getProductDetail(productId as string).then((res) => {
      return setProductDetail(res.data);
    });
    getCart().then((res) => {
      const productLineInCart = res.data.find((line) => line.productId === productId);
      if (productLineInCart) {
        setQuantity(productLineInCart.qty);
      }
    });
  }, []);

  return (
    <div>
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
                            addItemToCart(productDetail.id).then(() => setQuantity(1));
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
