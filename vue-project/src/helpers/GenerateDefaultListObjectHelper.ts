import { ObjectListObjectType } from "@/enums/ObjectListObjectType";
import { defaultCompanyDTO, defaultPositionDTO, defaultTaskDTO } from "@jobapplicationmanager/shared";

export function generateDefaultListObject(objectType: ObjectListObjectType) {
    switch (objectType) {
        case ObjectListObjectType.Companies:
            return defaultCompanyDTO();
        case ObjectListObjectType.Positions:
            return defaultPositionDTO();
        case ObjectListObjectType.Tasks:
            return defaultTaskDTO();
        default:
            return { error: 'type not found!' };
    }
}