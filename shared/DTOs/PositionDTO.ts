import { ApplicationDTO } from "./ApplicationDTO";
import { CompanyDTO } from "./CompanyDTO";

export interface PositionDTO {
    id: number | null,
    title: string,
    sourceUrl: string,
    company: CompanyDTO | null,
    application: ApplicationDTO | null,
}