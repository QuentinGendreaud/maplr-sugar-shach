import CatalogueItemTypeEnum from '../enums/catalogue-item-type.enum';
import CatalogueItemDto from '../interfaces/catalogue-item';

export const mockCatalogueSyrups: CatalogueItemDto[] = [
  {
    id: '001',
    name: `Sirop d'érable doré - Dorica`,
    image: `mockImg`,
    price: 9.5,
    maxQty: 150,
    type: CatalogueItemTypeEnum.clear
  },
  {
    id: '002',
    name: `Sirop d'érable ambré - Bouteille Feuille d'érable`,
    image: `mockImg`,
    price: 9.5,
    maxQty: 300,
    type: CatalogueItemTypeEnum.amber
  },
  {
    id: '003',
    name: `Sirop d'érable doré - Dorica`,
    image: `mockImg`,
    price: 9.5,
    maxQty: 100,
    type: CatalogueItemTypeEnum.amber
  },
  {
    id: '004',
    name: `Sirop d'érable foncé (goût robuste) - Cruchon`,
    image: `mockImg`,
    price: 9.5,
    maxQty: 300,
    type: CatalogueItemTypeEnum.dark
  },
  {
    id: '005',
    name: `Sirop d'érable doré - Bouteille Feuille d'érable`,
    image: `mockImg`,
    price: 9.5,
    maxQty: 100,
    type: CatalogueItemTypeEnum.clear
  },
  {
    id: '006',
    name: `Sirop d'érable en conserve`,
    image: `mockImg`,
    price: 10.9,
    maxQty: 50,
    type: CatalogueItemTypeEnum.dark
  }
];

export const mockCatalogueAmberSyrups: CatalogueItemDto[] = [
  {
    id: '002',
    name: `Sirop d'érable ambré - Bouteille Feuille d'érable`,
    image: `mockImg`,
    price: 9.5,
    maxQty: 300,
    type: CatalogueItemTypeEnum.amber
  },
  {
    id: '003',
    name: `Sirop d'érable doré - Dorica`,
    image: `mockImg`,
    price: 9.5,
    maxQty: 100,
    type: CatalogueItemTypeEnum.amber
  }
];
