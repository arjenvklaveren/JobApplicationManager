import { Controller, UseGuards } from '@nestjs/common';
import { CompanyService } from './company.service';
import type { CompanyDTO } from '@jobapplicationmanager/shared';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { BaseController } from 'src/base/base.controller';

@UseGuards(AuthGuard)
@Controller('company')
export class CompanyController extends BaseController<CompanyDTO> {
    constructor(private companyService: CompanyService) {
        super(companyService);
    }
}
