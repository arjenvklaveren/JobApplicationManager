import { Injectable } from '@nestjs/common';
import { ContactPersonRepository } from './contact-person.repository';
import { mapContactPersonToDTO } from 'helpers/dtoConverterHelper';
import { BaseService } from 'src/base/base.service';
import { ContactPersonDTO } from '@jobapplicationmanager/shared';
import { ContactPerson, Prisma } from 'generated/prisma/browser';

@Injectable()
export class ContactPersonService extends BaseService<
    ContactPersonDTO,
    Prisma.ContactPersonCreateInput,
    Prisma.ContactPersonUpdateInput,
    Prisma.ContactPersonGetPayload<{
        include: {
            company: true;
        };
    }>
> {
    constructor(private contactPersonRepository: ContactPersonRepository) { 
        super(contactPersonRepository, (contactPerson) => mapContactPersonToDTO(contactPerson,contactPerson.company));
    }

    protected mapCreate(dto: ContactPersonDTO, accountId: number): Prisma.ContactPersonCreateInput {
        return {
            name: dto.name,
            position: dto.position,
            email: dto.email,
            phone: dto.phone,
            company: {
                connect: {
                    id: dto.company?.id!
                }
            },
            account: {
                connect: {
                    id: accountId,
                },
            },
        }
    }
    protected mapUpdate(dto: ContactPersonDTO): Prisma.ContactPersonUpdateInput {
        return {
            name: dto.name,
            position: dto.position,
            email: dto.email,
            phone: dto.phone,
            company: {
                connect: {
                    id: dto.company?.id!,
                },
            }
        }
    }
}
