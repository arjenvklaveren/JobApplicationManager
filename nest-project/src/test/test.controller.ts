import { Body, Controller, Get, Post } from '@nestjs/common';
import { PrismaService } from 'src/misc/prisma.service';
import { Prisma } from 'generated/prisma/client';
import type { RegisterDTO } from '@jobapplicationmanager/shared';

@Controller('test')
export class TestController {

    constructor(private prisma: PrismaService) {}

    @Get('/test')
    getTest() {
        return {
            test: "hoi",
            arjen: false,
            amount: 10
        }
    }
    @Post('test-register')
    async testRegister(@Body() createAccountDTO: RegisterDTO): Promise<Prisma.AccountCreateInput> {

        return this.prisma.account.create({ data: createAccountDTO });

    }
}
