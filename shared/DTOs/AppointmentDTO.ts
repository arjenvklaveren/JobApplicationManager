import { CompanyDTO } from "./CompanyDTO";

export interface AppointmentDTO {
    id: number | null,
    location: string,
    time: Date | null,
    company: CompanyDTO | null
}

export function defaultAppointmentDTO(): AppointmentDTO {
    return {
        id: null,
        location: '',
        time: null,
        company: null
    }
}