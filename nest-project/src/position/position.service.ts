import { Injectable } from '@nestjs/common';
import { PositionRepository } from './position.repository';
import { mapPositionToDTO } from 'helpers/dtoConverterHelper';
import type { PositionDTO } from '@jobapplicationmanager/shared';
import { Prisma } from 'generated/prisma/browser';
import { BaseService } from 'src/base/base.service';

@Injectable()
export class PositionService extends BaseService<
    PositionDTO,
    Prisma.PositionCreateInput,
    Prisma.PositionUpdateInput,
    Prisma.PositionGetPayload<{
        include: {
            company: true
        }
    }>
> {
    constructor(private positionRepository: PositionRepository) {
        super(positionRepository, ((position) => mapPositionToDTO(position, position.company)))
    }

    public async getAllPositionsAtCompany(companyId: number, accountId: number) {
        var positions = await this.positionRepository.getAllAtCompanyAsync(companyId, accountId);

        var positionsDTOs = positions.map(position => mapPositionToDTO(position, position.company));
        return positionsDTOs;
    }

    protected mapCreate(dto: PositionDTO, accountId: number): Prisma.PositionCreateInput {
        return {
            title: dto.title,
            sourceUrl: dto.sourceUrl,
            company: {
                connect: { id: dto.company?.id!}
            },
            account: {
                connect: { id: accountId }
            }
        }
    }
    protected mapUpdate(dto: PositionDTO): Prisma.PositionUpdateInput {
        return {
            title: dto.title,
            sourceUrl: dto.sourceUrl,
            company: {
                connect: { id: dto.company?.id! }
            }
        }
    }
}
