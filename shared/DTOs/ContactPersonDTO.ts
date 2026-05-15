import { CompanyDTO } from "./CompanyDTO";

export interface ContactPersonDTO {
    id: number | null,
    name: string,
    position: string,
    email: string | null,
    phone: string | null,
    company: CompanyDTO | null
}

export function defaultContactPersonDTO(): ContactPersonDTO {
    return {
        id: null,
        name: '',
        position: '',
        email: null,
        phone: null,
        company: null
    }
}