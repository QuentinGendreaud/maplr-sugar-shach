import { of } from 'rxjs';
import CatalogueItemTypeEnum from '../enums/catalogue-item-type.enum';
import FileNameEnum from '../enums/file-name.enum';
import MapleSyrupDto from '../interfaces/maple-syrup';
import { mockCatalogueAmberSyrups, mockCatalogueSyrups } from '../mocks/catalogue-mock';
import { mockMapleSyrups } from '../mocks/maple-syrup.mock';
import ProductService from './product-service';

// Mock FileService
const mockFileService = {
  readFile: jest.fn().mockReturnValue(of(mockMapleSyrups)),
  updateFile: jest.fn().mockReturnValue(of())
};
jest.mock('./file-service.ts', () => {
  return jest.fn().mockImplementation(() => ({
    readFile: mockFileService.readFile
  }));
});

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(() => {
    service = new ProductService();
  });

  describe('Should getCatalogueItems', () => {
    it('without syrup type', () => {
      service.getCatalogueItems().subscribe({
        next: (catalogueItems) => {
          expect(mockFileService.readFile).toHaveBeenCalledWith(FileNameEnum.mapleSyrup);
          expect(catalogueItems).toStrictEqual(mockCatalogueSyrups);
        }
      });
    });

    it('with amber syrup type', () => {
      service.getCatalogueItems(CatalogueItemTypeEnum.amber).subscribe({
        next: (catalogueItems) => {
          expect(mockFileService.readFile).toHaveBeenCalledWith(FileNameEnum.mapleSyrup);
          expect(catalogueItems).toStrictEqual(mockCatalogueAmberSyrups);
        }
      });
    });
  });

  describe('Should getMapleSyrupDetail', () => {
    it('with an existing syrup identifier', () => {
      const expectedSyrup: MapleSyrupDto = {
        id: '1',
        name: `Sirop d'érable doré - Dorica`,
        image: `mockImg`,
        price: 9.5,
        stock: 150,
        description: 'product n°1',
        type: CatalogueItemTypeEnum.clear
      };

      service.getMapleSyrupDetail('1').subscribe({
        next: (syrup) => {
          expect(mockFileService.readFile).toHaveBeenCalledWith(FileNameEnum.mapleSyrup);
          expect(syrup).toStrictEqual(expectedSyrup);
        }
      });
    });

    it('with an unexisting syrup identifier', () => {
      service.getMapleSyrupDetail('999').subscribe({
        error: (errorValue) => {
          expect(errorValue).toEqual({ code: 400, description: `The product #999 doesn't exist` });
        }
      });
    });
  });
});
