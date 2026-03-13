import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestController } from './test/test.controller';
import { TestService } from './test/test.service';
import { PrismaService } from './misc/prisma.service';
import { AuthModule } from './auth/auth.module';
import { AccountModule } from './account/account.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    AccountModule
  ],
  controllers: [AppController, TestController],
  providers: [AppService, TestService, PrismaService],
})
export class AppModule {}
