import CatalogueItemTypeEnum from '../enums/catalogue-item-type.enum';
import CatalogueItemDto from '../interfaces/catalogue-item';

export const mockCatalogueSyrups: CatalogueItemDto[] = [
  {
    id: '1',
    name: `Sirop d'érable doré - Dorica`,
    image: `mockImg`,
    price: 9.5,
    maxQty: 150,
    type: CatalogueItemTypeEnum.clear
  },
  {
    id: '2',
    name: `Sirop d'érable ambré - Bouteille Feuille d'érable`,
    image: `mockImg`,
    price: 9.5,
    maxQty: 300,
    type: CatalogueItemTypeEnum.amber
  },
  {
    id: '3',
    name: `Sirop d'érable doré - Dorica`,
    image: `mockImg`,
    price: 9.5,
    maxQty: 100,
    type: CatalogueItemTypeEnum.amber
  },
  {
    id: '4',
    name: `Sirop d'érable foncé (goût robuste) - Cruchon`,
    image: `mockImg`,
    price: 9.5,
    maxQty: 300,
    type: CatalogueItemTypeEnum.dark
  },
  {
    id: '5',
    name: `Sirop d'érable doré - Bouteille Feuille d'érable`,
    image: `mockImg`,
    price: 9.5,
    maxQty: 100,
    type: CatalogueItemTypeEnum.clear
  },
  {
    id: '6',
    name: `Sirop d'érable en conserve`,
    image: `mockImg`,
    price: 10.9,
    maxQty: 50,
    type: CatalogueItemTypeEnum.dark
  }
];

export const mockCatalogueAmberSyrups: CatalogueItemDto[] = [
  {
    id: '2',
    name: `Sirop d'érable ambré - Bouteille Feuille d'érable`,
    image: `mockImg`,
    price: 9.5,
    maxQty: 300,
    type: CatalogueItemTypeEnum.amber
  },
  {
    id: '3',
    name: `Sirop d'érable doré - Dorica`,
    image: `mockImg`,
    price: 9.5,
    maxQty: 100,
    type: CatalogueItemTypeEnum.amber
  }
];
