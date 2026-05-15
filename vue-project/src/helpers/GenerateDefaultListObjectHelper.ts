import { ObjectListObjectType } from "@/enums/ObjectListObjectType";
import { defaultApplicationDTO, defaultAppointmentDTO, defaultCompanyDTO, defaultContactPersonDTO, defaultPositionDTO, defaultTaskDTO } from "@jobapplicationmanager/shared";

export function generateDefaultListObject(objectType: ObjectListObjectType) {
    switch (objectType) {
        case ObjectListObjectType.Companies:
            return defaultCompanyDTO();
        case ObjectListObjectType.Positions:
            return defaultPositionDTO();
        case ObjectListObjectType.Tasks:
            return defaultTaskDTO();
        case ObjectListObjectType.ContactPerson:
            return defaultContactPersonDTO();
        case ObjectListObjectType.Applications:
            return defaultApplicationDTO();
        case ObjectListObjectType.Appointments:
            return defaultAppointmentDTO();
        default:
            return { error: 'type not found!' };
    }
}