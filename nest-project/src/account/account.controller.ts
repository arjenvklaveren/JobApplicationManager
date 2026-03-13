import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AccountService } from './account.service';
import type { LoginDTO } from '@jobapplicationmanager/shared';
import { ApiBearerAuth, ApiBody, ApiHeader } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('account')
export class AccountController {
    constructor(private accountService: AccountService) {}

    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                username: { type: 'string' },
                password: { type: 'string' }
            }
        }
    })
    @Post('/login-temp')
    async loginTemp(@Body() loginDTO: LoginDTO) {
        await this.accountService.login(loginDTO);
    }
}
