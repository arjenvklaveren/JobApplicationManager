import { PositionDTO } from "./PositionDTO";
import { NoteDTO } from "./NoteDTO";

export interface CompanyDTO {
    id: number | null,
    name: string,
    city: string,
    websiteUrl: string,
    positions: PositionDTO[],
    notes: NoteDTO[],
}

export function defaultCompanyDTO(): CompanyDTO {
    return {
        id: null,
        name: '',
        city: '',
        websiteUrl: '',
        positions: [],
        notes: []
    }
}