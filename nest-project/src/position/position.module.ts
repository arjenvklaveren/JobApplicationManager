import { Module } from '@nestjs/common';
import { PositionService } from './position.service';
import { PositionController } from './position.controller';
import { PositionRepository } from './position.repository';
import { PrismaService } from 'src/misc/prisma.service';

@Module({
  providers: [PositionService, PositionRepository, PrismaService],
  controllers: [PositionController]
})
export class PositionModule {}
