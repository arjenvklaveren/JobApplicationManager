import { PositionDTO } from "./PositionDTO";

export interface CompanyDTO {
    id: number | null,
    name: string,
    city: string,
    websiteUrl: string,
    positions: PositionDTO[]
}