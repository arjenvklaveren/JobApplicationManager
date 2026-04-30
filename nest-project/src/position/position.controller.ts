import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { PositionService } from './position.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { User } from 'src/auth/decorators/user.decorator';
import type { PositionDTO } from '@jobapplicationmanager/shared';

@UseGuards(AuthGuard)
@Controller('position')
export class PositionController {
    constructor(private positionService: PositionService) { }
    
    @Get('get-all')
    public async getPositions(@User() user: any) {
        
        return await this.positionService.getAllPositionsFromUser(user.sub);
    }

    @Get('get-all-at-company')
    public async getPositionsAtCompany( @Query('companyId', ParseIntPipe) companyId, @User() user: any) {
     
        return await this.positionService.getAllPositionsAtCompany(companyId, user.sub);
    }

    @Post('add-position')
    public async addCompany(@Body() positionDTO: PositionDTO, @User() user: any) {

        await this.positionService.addPosition(positionDTO, user.sub);
    }

    @Put('update-position')
    public async updateCompany(@Body() positionDTO: PositionDTO) {
        
        await this.positionService.updatePosition(positionDTO);
    }

    @Delete('delete-position/:id')
    public async deleteCompany(@Param('id', ParseIntPipe) positionId, @User() user: any) {

        await this.positionService.deletePosition(positionId, user.sub);
    }
}
