import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CompanyService } from './company.service';
import { ApiBody } from '@nestjs/swagger';
import type { CompanyDTO } from '@jobapplicationmanager/shared';
import { User } from 'src/auth/decorators/user.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('company')
export class CompanyController {
    constructor(private companyService: CompanyService) {}

    @UseGuards(AuthGuard)
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                name: { type: 'string' },
                city: { type: 'string' },
                websiteUrl: { type: 'string' },
            }
        }
    })
    @Post('add-company')
    public async addCompany(
        @Body() companyDTO: CompanyDTO,
        @User() user: any)
    {
        await this.companyService.addCompany(companyDTO, user.sub);
    }

    @UseGuards(AuthGuard)
    @Get('get-all')
    public async getCompanies(
        @User() user: any)
    {
        return await this.companyService.getAllCompaniesFromUser(user.sub);
    }
}
