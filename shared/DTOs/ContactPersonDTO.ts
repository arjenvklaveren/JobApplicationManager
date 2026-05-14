import { CompanyDTO } from "./CompanyDTO";

export interface ContactPersonDTO {
    name: string,
    position: string,
    email: string | null,
    phone: string | null,
    company: CompanyDTO
}