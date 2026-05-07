import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma/browser';
import { PrismaService } from 'src/misc/prisma.service';

@Injectable()
export class PositionRepository {
    constructor(private prisma: PrismaService) { }

    public async getAllAsync(accountId: number) {
        return await this.prisma.position.findMany({
            where: { accountId: accountId },
            include: { company: true }
        });
    }

    public async getAllAtCompanyAsync(companyId: number, accountId: number) {
        return await this.prisma.position.findMany({
            where: {
                companyId: companyId,
                accountId: accountId,
            },
            include: {company: true}
        })
    }

     public async createAsync(position: Prisma.PositionCreateInput) {
            await this.prisma.position.create({ data: position });
        }
    
    public async updateAsync(position: Prisma.PositionUpdateInput, positionId: number,) {
        return await this.prisma.position.update({
            where: {
                id: positionId,
            },
            data: position
        })
    }
    
    public async deleteAsync(positionId: number, accountId: number) {
        return await this.prisma.position.delete({
            where: {
                id: positionId,
                accountId: accountId
            }
        })
    }
}
