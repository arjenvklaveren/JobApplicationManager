import { Body, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { User } from 'src/auth/decorators/user.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@UseGuards(AuthGuard)
export abstract class BaseController<
    TDTO
> {
    constructor(protected service: any) { }
    
    @Get()
    async getAll(@User() user: any): Promise<TDTO[]> {
        return await this.service.getAll(user.sub);
    }

    @Post()
    async create(@Body() dto: TDTO, @User() user: any): Promise<TDTO> {
        return await this.service.create(dto, user.sub);
    }

    @Put()
    async update(@Body() dto: TDTO): Promise<TDTO> {
        return await this.service.update(dto);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) entityId: number, @User() user: any) {
        return await this.service.delete(entityId, user.sub);
    }
}
