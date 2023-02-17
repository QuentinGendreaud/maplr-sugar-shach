import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import CatalogueItemTypeEnum from '../../../enums/catalogue-item-type.enum';
import CatalogueItemDto from '../../../interfaces/catalogue-item';
import { getProducts } from '../../../services/product-service';
import CatalogueItem from './catalogue-item/catalogue-item';
import './catalogue.scss';

function CatalogueView() {
  const [syrupType, setSyrupType] = useState<CatalogueItemTypeEnum | undefined>(undefined);
  const [productList, setServiceData] = useState<CatalogueItemDto[]>([]);

  useEffect(() => {
    getProducts(syrupType).then((res) => {
      return setServiceData(res.data);
    });
  }, [syrupType]);

  // Manage select options
  const filterOptions = Object.values(CatalogueItemTypeEnum).map((value) => (
    <option value={value} key={value}>
      {value.toLowerCase()}
    </option>
  ));

  return (
    <div>
      <h1>Our products :</h1>

      {/* Catalogue filter */}
      <div className="catalogue-filter">
        <Form.Label htmlFor="syrupTypeFilter">Syrup Type:</Form.Label>
        <Form.Select
          id="syrupTypeFilter"
          aria-label="select syrup type"
          onChange={(value) => {
            setSyrupType(value.target.value as CatalogueItemTypeEnum);
          }}
        >
          <option>all</option>
          {filterOptions}
        </Form.Select>
      </div>

      {/* Catalogue item list */}
      <div className="catalogue-item-list">
        {productList.map((catalogItem) => (
          <CatalogueItem key={catalogItem.id} catalogItem={catalogItem} />
        ))}
      </div>
    </div>
  );
}

export default CatalogueView;
