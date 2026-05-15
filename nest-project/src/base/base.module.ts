import { Module } from '@nestjs/common';
import { PrismaService } from 'src/misc/prisma.service';

@Module({
  providers: [PrismaService],
})
export class BaseModule {}
