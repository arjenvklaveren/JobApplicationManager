import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestController } from './test/test.controller';
import { TestService } from './test/test.service';
import { PrismaService } from './misc/prisma.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController, TestController],
  providers: [AppService, TestService, PrismaService],
})
export class AppModule {}
