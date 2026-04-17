import { Controller, Get, UseGuards } from '@nestjs/common';
import { PositionService } from './position.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { User } from 'src/auth/decorators/user.decorator';

@Controller('position')
export class PositionController {
    constructor(private positionService: PositionService) { }
    
    @UseGuards(AuthGuard)
    @Get('get-all')
    public async getPositions(
        @User() user: any)
    {
        return await this.positionService.getAllPositionsFromUser(user.sub);
    }
}
