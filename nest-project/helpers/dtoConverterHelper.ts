import { CompanyDTO, PositionDTO } from "@jobapplicationmanager/shared";
import { Company, Position, Prisma } from "generated/prisma/browser";

type CompanyWithPositions = Prisma.CompanyGetPayload<{
  include: { positions: true };
}>;

export function mapCompanyToDTO(company: CompanyWithPositions): CompanyDTO {
    return {
        id: company.id,
        name: company.name,
        city: company.city,
        websiteUrl: company.websiteUrl,
        positions: company.positions.map(position => mapPositionToDTO(position, company)),
        notes: []
    };
}

export function mapPositionToDTO(position: Position, company: Company): PositionDTO {
    return {
        id: position.id,
        title: position.title,
        sourceUrl: position.sourceUrl,
        company: {
            id: company.id,
            name: company.name,
            city: company.city,
            websiteUrl: company.websiteUrl,
            positions: [],
            notes: []
        },
        application: null
    };
}