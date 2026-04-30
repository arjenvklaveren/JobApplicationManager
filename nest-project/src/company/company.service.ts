import { Injectable } from '@nestjs/common';
import { CompanyRepository } from './company.repository';
import { CompanyDTO } from '@jobapplicationmanager/shared';
import { Prisma } from 'generated/prisma/browser';
import { mapCompanyToDTO } from 'helpers/dtoConverterHelper';

@Injectable()
export class CompanyService {
    constructor(private companyRepository: CompanyRepository) {}

    public async getAllCompaniesFromUser(accountId: number) {
        var companies = await this.companyRepository.getAllAsync(accountId);

        var companiesDTOs = companies.map(mapCompanyToDTO);
        return companiesDTOs;
    }

    public async addCompany(companyDTO: CompanyDTO, accountId: number) {

        const createCompanyObject: Prisma.CompanyCreateInput = {
            name: companyDTO.name,
            city: companyDTO.city,
            websiteUrl: companyDTO.websiteUrl,
            account: {
                connect: { id: accountId }
            }
        }

        await this.companyRepository.createAsync(createCompanyObject);
    }

    public async updateCompany(companyDTO: CompanyDTO) {

        const updateCompanyObject: Prisma.CompanyUpdateInput = {
            name: companyDTO.name,
            city: companyDTO.city,
            websiteUrl: companyDTO.websiteUrl,
        }

        await this.companyRepository.updateAsync(updateCompanyObject, companyDTO.id!);
    }

    public async deleteCompany(companyId: number, accountId: number) {
        await this.companyRepository.deleteAsync(companyId, accountId);
    }
}
