import { Body, Controller, Get, Post, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AccountService } from './account.service';
import type { LoginDTO, RegisterDTO } from '@jobapplicationmanager/shared';
import { ApiBearerAuth, ApiBody, ApiCookieAuth, ApiHeader } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import * as argon from 'argon2' 
import { Prisma } from 'generated/prisma/browser';
import { PrismaService } from 'src/misc/prisma.service';
import type { Response } from 'express';

@Controller('account')
export class AccountController {
    constructor(private accountService: AccountService, private prisma: PrismaService) {}

    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                name: { type: 'string' },
                password: { type: 'string' },
                city: { type: 'string' }
            }
        }
    })
    @Post('/register')
    async register(@Body() registerDTO: RegisterDTO) {
        await this.accountService.createAccount(registerDTO);
    }

    //@UseGuards(AuthGuard)
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
    @Post('/login')
    async login(@Body() loginDTO: LoginDTO, @Res({ passthrough: true }) response: Response) {

        const token_object = await this.accountService.login(loginDTO);

        if (token_object == null) throw new UnauthorizedException();
        
        response.cookie('access_token', token_object.access_token, {
            httpOnly: true,
            sameSite: 'lax',
        });
    }
}
