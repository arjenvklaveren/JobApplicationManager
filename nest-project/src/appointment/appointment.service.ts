import { Injectable } from '@nestjs/common';
import { AppointmentRepository } from './appointment.repository';
import { mapAppointmentToDTO } from 'helpers/dtoConverterHelper';

@Injectable()
export class AppointmentService {
    constructor(private appointmentRepository: AppointmentRepository) { }
    
    public async getAllAsync(accountId: number) {

        let appointments = await this.appointmentRepository.getAll(accountId); 

        let appointmentDTOs = appointments.map(appointment => mapAppointmentToDTO(appointment, appointment.company));
        return appointmentDTOs;
    }
}
