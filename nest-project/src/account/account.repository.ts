import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/misc/prisma.service";
import { Account, Prisma } from 'generated/prisma/browser';

@Injectable()
export class AccountRepository {
    constructor(private prisma: PrismaService) {}

    public async findByNameAsync(username: string) : Promise<Account | null> {
        return await this.prisma.account.findUnique({ where: { name: username } });
    }

    public async createNewAsync(account: Prisma.AccountCreateInput) {
        await this.prisma.account.create({ data: account });
    }

}