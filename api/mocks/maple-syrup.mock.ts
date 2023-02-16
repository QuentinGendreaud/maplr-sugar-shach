import CatalogueItemTypeEnum from '../enums/catalogue-item-type.enum';
import MapleSyrupDto from '../interfaces/maple-syrup';

export const mockMapleSyrups: MapleSyrupDto[] = [
  {
    id: '001',
    name: `Sirop d'érable doré - Dorica`,
    image: `mockImg`,
    price: 9.5,
    stock: 150,
    description: 'product n°001',
    type: CatalogueItemTypeEnum.clear
  },
  {
    id: '002',
    name: `Sirop d'érable ambré - Bouteille Feuille d'érable`,
    image: `mockImg`,
    price: 9.5,
    stock: 300,
    description: 'product n°002',
    type: CatalogueItemTypeEnum.amber
  },
  {
    id: '003',
    name: `Sirop d'érable doré - Dorica`,
    image: `mockImg`,
    price: 9.5,
    stock: 100,
    description: 'product n°003',
    type: CatalogueItemTypeEnum.amber
  },
  {
    id: '004',
    name: `Sirop d'érable foncé (goût robuste) - Cruchon`,
    image: `mockImg`,
    price: 9.5,
    stock: 300,
    description: 'product n°004',
    type: CatalogueItemTypeEnum.dark
  },
  {
    id: '005',
    name: `Sirop d'érable doré - Bouteille Feuille d'érable`,
    image: `mockImg`,
    price: 9.5,
    stock: 100,
    description: 'product n°005',
    type: CatalogueItemTypeEnum.clear
  },
  {
    id: '006',
    name: `Sirop d'érable en conserve`,
    image: `mockImg`,
    price: 10.9,
    stock: 50,
    description: 'product n°006',
    type: CatalogueItemTypeEnum.dark
  }
];
