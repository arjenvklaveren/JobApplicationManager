import { Body, Controller, Get, Post, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AccountService } from './account.service';
import type { LoginDTO, RegisterDTO } from '@jobapplicationmanager/shared';
import { PrismaService } from 'src/misc/prisma.service';
import type { Response } from 'express';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('account')
export class AccountController {
    constructor(private accountService: AccountService, private prisma: PrismaService) {}

    @UseGuards(AuthGuard)
    @Get('check-auth-state') 
    async checkAuthState() {
        return "Authorized";
    }

    @Post('register')
    async register(@Body() registerDTO: RegisterDTO) {
        await this.accountService.createAccount(registerDTO);
    }

    @Post('login')
    async login(@Body() loginDTO: LoginDTO, @Res({ passthrough: true }) response: Response) {

        const token_object = await this.accountService.login(loginDTO);

        if (token_object == null) throw new UnauthorizedException();
        
        response.cookie('access_token', token_object.access_token, {
            httpOnly: true,
            sameSite: 'lax',
        });
    }

    @Post('logout')
    async logout(@Res({ passthrough: true }) response: Response) {
        response.cookie('access_token', '', {
            httpOnly: true,
            sameSite: 'lax',
            expires: new Date(0),
        })
    }
}
