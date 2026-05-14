import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/misc/prisma.service';

@Injectable()
export class ApplicationRepository {
    constructor(private prisma: PrismaService) { }
    
    public async getAll(accountId: number) {
        return await this.prisma.application.findMany({
            where: { accountId: accountId },
            include: { position: true, applicant: true }
        })
    }
}
