import { mergeMap, Observable } from 'rxjs';
import FileNameEnum from '../enums/file-name.enum';
import OrderLineDto from '../interfaces/order-line';
import FileService from './file-service';

class OrderService {
  private readonly fileService = new FileService();

  public sendOrder(order: OrderLineDto[]): Observable<void> {
    return this.fileService.readFile(FileNameEnum.orders).pipe(
      mergeMap((orders) => {
        const updatedOrder: OrderLineDto[] = [...orders, ...order];
        return this.fileService.updateFile(FileNameEnum.orders, updatedOrder);
      })
    );
  }
}

export default OrderService;
