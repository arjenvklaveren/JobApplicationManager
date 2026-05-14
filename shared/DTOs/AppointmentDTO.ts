import { CompanyDTO } from "./CompanyDTO";

export interface AppointmentDTO {
    id: number,
    location: string,
    time: Date | null,
    company: CompanyDTO | null
}