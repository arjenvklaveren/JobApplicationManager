import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import type { AppointmentDTO } from '@jobapplicationmanager/shared';
import { BaseController } from 'src/base/base.controller';

@UseGuards(AuthGuard)
@Controller('appointment')
export class AppointmentController extends BaseController <AppointmentDTO> {
    constructor(private appointmentService: AppointmentService) { 
        super(appointmentService);
    }
}
