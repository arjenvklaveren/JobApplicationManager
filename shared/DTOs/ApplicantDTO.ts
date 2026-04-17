import { ApplicationDTO } from "./ApplicationDTO";

export interface ApplicantDTO {
    id: number | null,
    accountId: number,
    city: string,
    applications: ApplicationDTO[]
}