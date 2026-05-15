import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/base/base.service';
import { ApplicationDTO } from '@jobapplicationmanager/shared';
import { Prisma } from 'generated/prisma/browser';
import { ApplicationRepository } from './application.repository';
import { mapApplicationToDTO } from 'helpers/dtoConverterHelper';

@Injectable()
export class ApplicationService extends BaseService <
    ApplicationDTO,
    Prisma.ApplicationCreateInput,
    Prisma.ApplicationUpdateInput,
    Prisma.ApplicationGetPayload<{
        include: {
            applicant: true,
            position: true,
        };
    }>
> {
    constructor(private applicationRepository: ApplicationRepository) { 
        super(applicationRepository, (application) => mapApplicationToDTO(application, application.position, application.applicant));
    }

    protected mapCreate(dto: ApplicationDTO, accountId: number): Prisma.ApplicationCreateInput {
        return {
            applied_date: dto.applied_date,
            applicant: {
                connect: {
                    id: dto.applicant?.id!
                }
            },
            position: {
                connect: {
                    id: dto.position?.id!
                }
            },
            account: {
                connect: {
                    id: accountId,
                },
            },
        }
    }
    protected mapUpdate(dto: ApplicationDTO): Prisma.ApplicationUpdateInput {
        return {
            applied_date: dto.applied_date,
            position: {
                connect: {
                    id: dto.position?.id!
                }
            },
        }
    }
}
