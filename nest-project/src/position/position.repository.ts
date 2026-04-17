import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/misc/prisma.service';

@Injectable()
export class PositionRepository {
    constructor(private prisma: PrismaService) { }

    public async getAllAsync(userId: number) {
        return await this.prisma.position.findMany({
            where: { accountId: userId }
        });
    }
}
