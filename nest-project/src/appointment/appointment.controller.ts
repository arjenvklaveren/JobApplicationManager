import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { User } from 'src/auth/decorators/user.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('appointment')
export class AppointmentController {
    constructor(private appointmentService: AppointmentService) { }
    
    @Get('get-all')
    public async getAppointments(@User() user: any) {
        return await this.appointmentService.getAllAsync(user.sub);
    }
}
