import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/misc/prisma.service';

@Injectable()
export class AppointmentRepository {
    constructor(private prisma: PrismaService) { }
    
    public async getAll(accountId: number) {
        return await this.prisma.appointment.findMany({
            where: { accountId: accountId },
            include: { company: true }
        });
    }
}
