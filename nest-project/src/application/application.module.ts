import { Module } from '@nestjs/common';
import { ApplicationController } from './application.controller';
import { ApplicationService } from './application.service';
import { PrismaService } from 'src/misc/prisma.service';
import { ApplicationRepository } from './application.repository';

@Module({
  controllers: [ApplicationController],
  providers: [ApplicationService, ApplicationRepository, PrismaService]
})
export class ApplicationModule {}
