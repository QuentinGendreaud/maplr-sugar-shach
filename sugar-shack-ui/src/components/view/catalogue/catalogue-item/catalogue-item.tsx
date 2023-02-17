import React from 'react';
import Badge from 'react-bootstrap/esm/Badge';
import Button from 'react-bootstrap/esm/Button';
import Card from 'react-bootstrap/esm/Card';
import CatalogueItemDto from '../../../../interfaces/catalogue-item';
import './catalogue-item.scss';

function CatalogueItem(props: { catalogItem: CatalogueItemDto }) {
  const lowerCaseType = props.catalogItem.type.toLowerCase();
  const displayedPrice = new Intl.NumberFormat(window.navigator.language, { style: 'currency', currency: 'CAD' }).format(
    props.catalogItem.price
  );

  return (
    <Card className="catalogue-item">
      <Badge pill className={'product-badge product-badge__' + lowerCaseType}>
        {lowerCaseType}
      </Badge>
      <Card.Img variant="top" src={props.catalogItem.image} />
      <Card.Body>
        <Card.Title>{props.catalogItem.name}</Card.Title>
        <span>
          <strong>Price: </strong>
          {displayedPrice}
        </span>
        <div className="more-detail">
          <Button variant="primary" href={'/product-detail/' + props.catalogItem.id} className="more-detail-button">
            More detail
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default CatalogueItem;
