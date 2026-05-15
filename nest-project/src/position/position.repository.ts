import { Injectable } from '@nestjs/common';
import { Position, Prisma } from 'generated/prisma/browser';
import { BaseRepository } from 'src/base/base.repository';
import { PrismaService } from 'src/misc/prisma.service';

@Injectable()
export class PositionRepository extends BaseRepository<
    Prisma.PositionCreateInput,
    Prisma.PositionUpdateInput,
    Prisma.PositionWhereUniqueInput,
    Position
> {
    constructor(private prisma: PrismaService) {
        super(prisma.position, { company: true })
    }

    public async getAllAtCompanyAsync(companyId: number, accountId: number) {
        return await this.prisma.position.findMany({
            where: {
                companyId: companyId,
                accountId: accountId,
            },
            include: { company: true },
        });
    }
}
