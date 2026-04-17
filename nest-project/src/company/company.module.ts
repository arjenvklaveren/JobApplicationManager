import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyRepository } from './company.repository';
import { CompanyController } from './company.controller';
import { PrismaService } from 'src/misc/prisma.service';

@Module({
  providers: [CompanyService, CompanyRepository, PrismaService],
  controllers: [CompanyController]
})
export class CompanyModule {}
