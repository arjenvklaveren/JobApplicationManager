import { ApplicantDTO } from "./ApplicantDTO";
import { PositionDTO } from "./PositionDTO";

export interface ApplicationDTO {
    id: number | null,
    applied_date: Date,
    position: PositionDTO | null,
    applicant: ApplicantDTO | null 
}

export function defaultApplicationDTO(): ApplicationDTO {
    return {
        id: null,
        applied_date: new Date(2000, 0, 1),
        position: null,
        applicant: null
    }
}
