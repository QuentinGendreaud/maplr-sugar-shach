import CatalogueItemTypeEnum from '../enums/catalogue-item-type.enum';
import MapleSyrupDto from '../interfaces/maple-syrup';

export const mockMapleSyrups: MapleSyrupDto[] = [
  {
    id: '1',
    name: `Sirop d'érable doré - Dorica`,
    image: `mockImg`,
    price: 9.5,
    stock: 150,
    description: 'product n°1',
    type: CatalogueItemTypeEnum.clear
  },
  {
    id: '2',
    name: `Sirop d'érable ambré - Bouteille Feuille d'érable`,
    image: `mockImg`,
    price: 9.5,
    stock: 300,
    description: 'product n°2',
    type: CatalogueItemTypeEnum.amber
  },
  {
    id: '3',
    name: `Sirop d'érable doré - Dorica`,
    image: `mockImg`,
    price: 9.5,
    stock: 100,
    description: 'product n°3',
    type: CatalogueItemTypeEnum.amber
  },
  {
    id: '4',
    name: `Sirop d'érable foncé (goût robuste) - Cruchon`,
    image: `mockImg`,
    price: 9.5,
    stock: 300,
    description: 'product n°4',
    type: CatalogueItemTypeEnum.dark
  },
  {
    id: '5',
    name: `Sirop d'érable doré - Bouteille Feuille d'érable`,
    image: `mockImg`,
    price: 9.5,
    stock: 100,
    description: 'product n°5',
    type: CatalogueItemTypeEnum.clear
  },
  {
    id: '6',
    name: `Sirop d'érable en conserve`,
    image: `mockImg`,
    price: 10.9,
    stock: 50,
    description: 'product n°6',
    type: CatalogueItemTypeEnum.dark
  }
];
