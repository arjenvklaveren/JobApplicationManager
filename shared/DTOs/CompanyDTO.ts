import { PositionDTO } from "./PositionDTO";
import { NoteDTO } from "./NoteDTO";
import { ContactPersonDTO } from "./ContactPersonDTO";

export interface CompanyDTO {
    id: number | null,
    name: string,
    city: string,
    websiteUrl: string,
    isAgency: boolean,
    contactPerson: ContactPersonDTO | null,
    positions: PositionDTO[],
    notes: NoteDTO[],
}

export function defaultCompanyDTO(): CompanyDTO {
    return {
        id: null,
        name: '',
        city: '',
        websiteUrl: '',
        isAgency: false,
        contactPerson: null,
        positions: [],
        notes: []
    }
}