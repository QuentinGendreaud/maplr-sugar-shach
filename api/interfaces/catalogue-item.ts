import CatalogueItemTypeEnum from "../enums/catalogue-item-type.enum";

interface CatalogueItemDto {
    id: string;
    name: string;
    image: string;
    price: number;
    maxQty: number;
    type: CatalogueItemTypeEnum;
}

export default CatalogueItemDto;