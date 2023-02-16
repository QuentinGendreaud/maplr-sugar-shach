import CatalogueItemTypeEnum from "../enums/catalogue-item-type.enum";

export const getCorrespondingSyropType = (receivedSyropType?: string): CatalogueItemTypeEnum | undefined => {
    switch (receivedSyropType?.toUpperCase()) {
        case CatalogueItemTypeEnum.amber:
            return CatalogueItemTypeEnum.amber;
        case CatalogueItemTypeEnum.dark:
            return CatalogueItemTypeEnum.dark;
        case CatalogueItemTypeEnum.clear:
            return CatalogueItemTypeEnum.clear;
        default:
            return undefined;
    }
}