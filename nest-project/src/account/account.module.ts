import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { AuthModule } from 'src/auth/auth.module';
import { AccountRepository } from './account.repository';
import { PrismaService } from 'src/misc/prisma.service';

@Module({
  imports: [AuthModule],
  controllers: [AccountController],
  providers: [AccountService, AccountRepository, PrismaService]
})
export class AccountModule {}
