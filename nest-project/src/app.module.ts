import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './misc/prisma.service';
import { AuthModule } from './auth/auth.module';
import { AccountModule } from './account/account.module';
import { CompanyModule } from './company/company.module';
import { PositionModule } from './position/position.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    AccountModule,
    CompanyModule,
    PositionModule
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
