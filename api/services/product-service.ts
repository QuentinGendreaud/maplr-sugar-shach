import { map, mergeMap, Observable, of, throwError } from 'rxjs';
import { serviceResponseConstantes } from '../constants/service-response.const';
import CatalogueItemTypeEnum from '../enums/catalogue-item-type.enum';
import FileNameEnum from '../enums/file-name.enum';
import CatalogueItemDto from '../interfaces/catalogue-item';
import MapleSyrupDto from '../interfaces/maple-syrup';
import ServiceResponse from '../interfaces/service-response';
import FileService from './file-service';

class ProductService {
    private readonly fileService = new FileService();

    public getCatalogueItems(syrupType?: CatalogueItemTypeEnum): Observable<CatalogueItemDto[]> {
        return this.fileService.readFile(FileNameEnum.mapleSyrup).pipe(
            map((syrupElements: MapleSyrupDto[]) => {
                const syrupList = syrupType ? syrupElements.filter((element) => element.type === syrupType) : syrupElements;
                return syrupList.map((syrup) => this.formatMaplrSyrupAsCatalogueItem(syrup));
            })
        );
    }

    public getMapleSyrupDetail(productId: string): Observable<MapleSyrupDto> {
        return this.fileService.readFile(FileNameEnum.mapleSyrup).pipe(
            mergeMap((mapleSyrups: MapleSyrupDto[]) => {
                const syrup = mapleSyrups.find((syrup) => syrup.id === productId)
                if (syrup) {
                    return of(syrup);
                } else {
                    const formattedError: ServiceResponse = {
                        code: serviceResponseConstantes.BAD_REQUEST.code,
                        description: `The product #${productId} doesn't exist`
                    };
                    return throwError(() => formattedError)
                }
            })
        );
    }

    private formatMaplrSyrupAsCatalogueItem(syrup: MapleSyrupDto): CatalogueItemDto {
        return {
            id: syrup.id,
            image: syrup.image,
            maxQty: syrup.stock,
            name: syrup.name,
            price: syrup.price,
            type: syrup.type
        }
    }
}

export default ProductService;