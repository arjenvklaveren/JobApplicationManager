import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { ApplicationService } from './application.service';
import type { ApplicationDTO } from '@jobapplicationmanager/shared';
import { BaseController } from 'src/base/base.controller';

@UseGuards(AuthGuard)
@Controller('application')
export class ApplicationController extends BaseController<ApplicationDTO> {
    constructor(private applicationService: ApplicationService) { 
        super(applicationService);
    }
}
