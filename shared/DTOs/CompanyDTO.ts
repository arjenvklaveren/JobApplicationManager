import { PositionDTO } from "./PositionDTO";

export interface CompanyDTO {
    id: number | null,
    name: string,
    city: string,
    websiteUrl: string,
    positions: PositionDTO[]
}

export function defaultCompanyDTO(): CompanyDTO {
    return {
        id: null,
        name: '',
        city: '',
        websiteUrl: '',
        positions: []
    }
}