import { ApplicantDTO } from "./ApplicantDTO";
import { PositionDTO } from "./PositionDTO";

export interface ApplicationDTO {
    id: number | null,
    applied_date: Date,
    position: PositionDTO,
    applicant: ApplicantDTO 
}