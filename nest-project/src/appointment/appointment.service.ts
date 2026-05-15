import { Injectable } from '@nestjs/common';
import { AppointmentRepository } from './appointment.repository';
import { mapAppointmentToDTO } from 'helpers/dtoConverterHelper';
import { BaseService } from 'src/base/base.service';
import { AppointmentDTO } from '@jobapplicationmanager/shared';
import { Prisma } from 'generated/prisma/browser';

@Injectable()
export class AppointmentService extends BaseService<
    AppointmentDTO,
    Prisma.AppointmentCreateInput,
    Prisma.AppointmentUpdateInput,
    Prisma.AppointmentGetPayload<{
        include: {
            company: true;
        };
    }>
> {
    constructor(private appointmentRepository: AppointmentRepository) { 
         super(appointmentRepository, (appointment) => mapAppointmentToDTO(appointment, appointment.company));
     }
    
    protected mapCreate(dto: AppointmentDTO, accountId: number): Prisma.AppointmentCreateInput {
        return {
            location: dto.location,
            time: dto.time || null,
            company: {
                connect: {
                    id: dto.company?.id!
                }
            },
            account: {
                connect: {
                    id: accountId,
                },
            },
        }
    }
    protected mapUpdate(dto: AppointmentDTO): Prisma.AppointmentUpdateInput {
         return {
            location: dto.location,
            time: dto.time || null,
            company: {
                connect: {
                    id: dto.company?.id!
                }
            }
        }
    }    
}
