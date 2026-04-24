import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { CompanyService } from './company.service';
import { ApiBody } from '@nestjs/swagger';
import type { CompanyDTO } from '@jobapplicationmanager/shared';
import { User } from 'src/auth/decorators/user.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('company')
export class CompanyController {
    constructor(private companyService: CompanyService) {}

    @Get('get-all')
    public async getCompanies(@User() user: any) {

        return await this.companyService.getAllCompaniesFromUser(user.sub);
    }

    @Post('add-company')
    public async addCompany(@Body() companyDTO: CompanyDTO, @User() user: any) {

        await this.companyService.addCompany(companyDTO, user.sub);
    }

    @Put('update-company')
    public async updateCompany(@Body() companyDTO: CompanyDTO) {
        
        await this.companyService.updateCompany(companyDTO);
    }

    @Delete('delete-company/:id')
    public async deleteCompany(@Param('id', ParseIntPipe) companyId, @User() user: any) {

        await this.companyService.deleteCompany(companyId, user.sub);
    }
}
