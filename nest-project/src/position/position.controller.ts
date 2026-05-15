import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { PositionService } from './position.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { User } from 'src/auth/decorators/user.decorator';
import type { PositionDTO } from '@jobapplicationmanager/shared';
import { BaseController } from 'src/base/base.controller';

@UseGuards(AuthGuard)
@Controller('position')
export class PositionController extends BaseController<PositionDTO> {
    constructor(private positionService: PositionService) { 
        super(positionService);
    }
    
    @Get('get-at-company')
    public async getPositionsAtCompany( @Query('companyId', ParseIntPipe) companyId, @User() user: any) {
        return await this.positionService.getAllPositionsAtCompany(companyId, user.sub);
    }
}
