import { Module } from '@nestjs/common';
import { ContactPersonController } from './contact-person.controller';
import { ContactPersonService } from './contact-person.service';
import { ContactPersonRepository } from './contact-person.repository';
import { PrismaService } from 'src/misc/prisma.service';

@Module({
  controllers: [ContactPersonController],
  providers: [ContactPersonService, ContactPersonRepository, PrismaService]
})
export class ContactPersonModule {}
