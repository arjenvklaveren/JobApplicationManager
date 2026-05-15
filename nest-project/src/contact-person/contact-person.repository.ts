import { Injectable } from '@nestjs/common';
import { ContactPerson, Position, Prisma } from 'generated/prisma/browser';
import { BaseRepository } from 'src/base/base.repository';
import { PrismaService } from 'src/misc/prisma.service';

@Injectable()
export class ContactPersonRepository extends BaseRepository<
    Prisma.ContactPersonCreateInput,
    Prisma.ContactPersonUpdateInput,
    Prisma.ContactPersonWhereUniqueInput,
    ContactPerson
> {
    constructor(prisma: PrismaService) {
        super(prisma.contactPerson, { company: true });
    }
}
