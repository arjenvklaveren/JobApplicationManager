import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/misc/prisma.service';

@Injectable()
export class ContactPersonRepository {
    constructor(private prisma: PrismaService) { }
    
    public async getAll(accountId: number) {
        return await this.prisma.contactPerson.findMany({
            where: { accountId: accountId },
            include: { company: true }
        })
    }
}
