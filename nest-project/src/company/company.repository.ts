import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma/client';
import { PrismaService } from 'src/misc/prisma.service';

@Injectable()
export class CompanyRepository {
    constructor(private prisma: PrismaService) { }
    
    public async getAllAsync(accountId: number) {
        return await this.prisma.company.findMany({
            where: { accountId: accountId },
            include: { positions: true }
        });
    }

    public async createAsync(company: Prisma.CompanyCreateInput) {
        await this.prisma.company.create({ data: company });
    }

    public async updateAsync(company: Prisma.CompanyUpdateInput, companyId: number,) {
        return await this.prisma.company.update({
            where: {
                id: companyId,
            },
            data: company
        })
    }

    public async deleteAsync(companyId: number, accountId: number) {
        return await this.prisma.company.delete({
            where: {
                id: companyId,
                accountId: accountId
            }
        })
    }
}
