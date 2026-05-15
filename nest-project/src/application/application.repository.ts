import { Injectable } from '@nestjs/common';
import { Application, Prisma } from 'generated/prisma/browser';
import { BaseRepository } from 'src/base/base.repository';
import { PrismaService } from 'src/misc/prisma.service';

@Injectable()
export class ApplicationRepository extends BaseRepository<
    Prisma.ApplicationCreateInput,
    Prisma.ApplicationUpdateInput,
    Prisma.ApplicationWhereUniqueInput,
    Application
> {
    constructor(prisma: PrismaService) {
        super(prisma.application, { position: true, applicant: true });
    }
}
