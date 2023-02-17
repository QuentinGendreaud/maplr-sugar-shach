import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import Nav from 'react-bootstrap/esm/Nav';
import MapleSyrupDto from '../../../interfaces/maple-syrup';
import { getProductDetail } from '../../../services/product-service';
import './product-detail.scss';
import Spinner from 'react-bootstrap/esm/Spinner';
import { useParams } from 'react-router-dom';

function productDetailTemplate(productDetail: MapleSyrupDto) {
  return (
    <Card>
      <div className="card-content">
        <Card.Img variant="top" src={productDetail.image} />
        <Card.Body>
          <Card.Title>{productDetail.name}</Card.Title>
          <Card.Text>{productDetail.description}</Card.Text>
        </Card.Body>
      </div>
    </Card>
  );
}

function loadingTemplate() {
  return <Spinner animation="border" variant="primary" className="loading-spinner" />;
}

function ProductDetail() {
  const { productId } = useParams();
  const [productDetail, setServiceData] = useState<MapleSyrupDto>();

  useEffect(() => {
    getProductDetail(productId as string).then((res) => {
      return setServiceData(res.data);
    });
  }, [productId]);

  return (
    <div>
      <Nav activeKey="/">
        <Nav.Item>
          <Nav.Link href="/" className="nav-back-btn" color="primary">
            Back
          </Nav.Link>
        </Nav.Item>
      </Nav>

      {productDetail ? productDetailTemplate(productDetail) : loadingTemplate()}
    </div>
  );
}

export default ProductDetail;
