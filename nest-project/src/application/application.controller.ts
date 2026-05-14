import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { ApplicationService } from './application.service';
import { User } from 'src/auth/decorators/user.decorator';

@UseGuards(AuthGuard)
@Controller('application')
export class ApplicationController {
    constructor(private applicationService: ApplicationService) { }
    
    @Get('get-all')
    public async getApplications(@User() user: any) {
        return await this.applicationService.getAllAsync(user.sub);
    }
}
