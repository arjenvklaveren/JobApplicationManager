import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma/client';
import { PrismaService } from 'src/misc/prisma.service';

@Injectable()
export class CompanyRepository {
    constructor(private prisma: PrismaService) { }
    
    public async createAsync(company: Prisma.CompanyCreateInput) {
        await this.prisma.company.create({ data: company });
    }

    public async getAllAsync(userId: number) {
        return await this.prisma.company.findMany({
            where: { accountId: userId },
            include: { positions: true }
        });
    }
}
