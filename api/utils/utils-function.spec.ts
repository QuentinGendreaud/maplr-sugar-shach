import CatalogueItemTypeEnum from "../enums/catalogue-item-type.enum";
import { getCorrespondingSyropType } from "./utils-function";

describe('UtilsFunction', () => {
    describe('Should getCorrespondingSyropType', () => {
        it('with amber type', () => {
            const res = getCorrespondingSyropType('amber');
            expect(res).toEqual(CatalogueItemTypeEnum.amber)
        });

        it('with dark type', () => {
            const res = getCorrespondingSyropType('dark');
            expect(res).toEqual(CatalogueItemTypeEnum.dark)
        });

        it('with clear type', () => {
            const res = getCorrespondingSyropType('clear');
            expect(res).toEqual(CatalogueItemTypeEnum.clear)
        });

        it('with undefined type', () => {
            const res = getCorrespondingSyropType('invalid');
            expect(res).toEqual(undefined)
        });
    });
});