import { Injectable } from '@nestjs/common';
import { Company } from 'generated/prisma/browser';
import { Prisma } from 'generated/prisma/client';
import { BaseRepository } from 'src/base/base.repository';
import { PrismaService } from 'src/misc/prisma.service';

@Injectable()
export class CompanyRepository extends BaseRepository<
    Prisma.CompanyCreateInput,
    Prisma.CompanyUpdateInput,
    Prisma.CompanyWhereUniqueInput,
    Company
> {
    constructor(prisma: PrismaService) { 
        super(prisma.company, { positions: true, contact: true })
    }
}
