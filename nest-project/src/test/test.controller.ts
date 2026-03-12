import { Controller, Get, Post } from '@nestjs/common';
import { PrismaService } from 'src/misc/prisma.service';
import { Prisma } from 'generated/prisma/client';

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

    @Post('/test-user')
    async testPost() : Promise<Prisma.UserCreateInput> {
        
        var newUser: Prisma.UserCreateInput = {
            name: "Arjen",
            email: "arjenvklaveren2@gmail.com"
        }
        return this.prisma.user.create({ data: newUser });

    }

}
