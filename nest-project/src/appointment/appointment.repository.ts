import { Injectable } from '@nestjs/common';
import { Appointment, Prisma } from 'generated/prisma/browser';
import { BaseRepository } from 'src/base/base.repository';
import { PrismaService } from 'src/misc/prisma.service';

@Injectable()
export class AppointmentRepository extends BaseRepository<
    Prisma.AppointmentCreateInput,
    Prisma.AppointmentUpdateInput,
    Prisma.AppointmentWhereUniqueInput,
    Appointment
> {
    constructor(prisma: PrismaService) { 
        super(prisma.appointment, { company: true });
     }
}
