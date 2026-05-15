import { Injectable } from '@nestjs/common';
import { CompanyRepository } from './company.repository';
import { CompanyDTO } from '@jobapplicationmanager/shared';
import { Prisma } from 'generated/prisma/browser';
import { mapCompanyToDTO } from 'helpers/dtoConverterHelper';
import { BaseService } from 'src/base/base.service';

@Injectable()
export class CompanyService extends BaseService<
    CompanyDTO,
    Prisma.CompanyCreateInput,
    Prisma.CompanyUpdateInput,
     Prisma.CompanyGetPayload<{
        include: {
            positions: true, contact: true
        };
    }>
    
> {
    constructor(private companyRepository: CompanyRepository) {
        super(companyRepository, ((company) => mapCompanyToDTO(company)))
    }

    protected mapCreate(dto: CompanyDTO, accountId: number): Prisma.CompanyCreateInput {
        return {
            name: dto.name,
            city: dto.city,
            websiteUrl: dto.websiteUrl,
            isAgency: dto.isAgency,
            account: {
                connect: {
                    id: accountId
                }
            }
        }
    }
    protected mapUpdate(dto: CompanyDTO): Prisma.CompanyUpdateInput {
        return {
            name: dto.name,
            city: dto.city,
            websiteUrl: dto.websiteUrl,
            isAgency: dto.isAgency,
        }
    }
}
