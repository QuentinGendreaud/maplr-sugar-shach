import CatalogueItemTypeEnum from "../enums/catalogue-item-type.enum";

interface MapleSyrupDto {
    id: string;
    name: string;
    description: string;
    image: string;
    price: number;
    stock: number;
    type: CatalogueItemTypeEnum;
}

export default MapleSyrupDto;