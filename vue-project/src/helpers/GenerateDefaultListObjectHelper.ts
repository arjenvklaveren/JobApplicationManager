import { ObjectListObjectType } from "@/enums/ObjectListObjectType";
import { defaultCompanyDTO, defaultPositionDTO } from "@jobapplicationmanager/shared";

export function generateDefaultListObject(objectType: ObjectListObjectType) {
    switch (objectType) {
        case ObjectListObjectType.Companies:
            return defaultCompanyDTO();
        case ObjectListObjectType.Positions:
            return defaultPositionDTO();
        default:
            return { error: 'type not found!' };
    }
}