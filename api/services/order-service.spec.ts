import { of } from 'rxjs';
import FileNameEnum from '../enums/file-name.enum';
import { mockOrder } from '../mocks/order-mock';
import OrderService from './order-service';

// Mock FileService
const mockFileService = {
  readFile: jest.fn().mockReturnValue(of(mockOrder)),
  updateFile: jest.fn().mockReturnValue(of())
};
jest.mock('./file-service.ts', () => {
  return jest.fn().mockImplementation(() => ({
    readFile: mockFileService.readFile,
    updateFile: mockFileService.updateFile
  }));
});

describe('OrderService', () => {
  let service: OrderService;

  beforeEach(() => {
    service = new OrderService();
  });

  it('Should sendOrder', () => {
    service.sendOrder(mockOrder).subscribe({
      next: () => {
        expect(mockFileService.readFile).toHaveBeenCalledWith(FileNameEnum.orders);
        expect(mockFileService.updateFile).toHaveBeenCalledWith(FileNameEnum.orders, mockOrder);
      }
    });
  });
});
