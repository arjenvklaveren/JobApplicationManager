import { Injectable } from '@nestjs/common';
import { PositionRepository } from './position.repository';
import { mapPositionToDTO } from 'helpers/dtoConverterHelper';
import type { PositionDTO } from '@jobapplicationmanager/shared';
import { Prisma } from 'generated/prisma/browser';
import { connect } from 'http2';

@Injectable()
export class PositionService {
    constructor(private positionRepository: PositionRepository) {}

    public async getAllPositionsFromUser(accountId: number) {
        var positions = await this.positionRepository.getAllAsync(accountId);

        var positionsDTOs = positions.map(mapPositionToDTO);
        return positionsDTOs;
    }

    public async getAllPositionsAtCompany(companyId: number, accountId: number) {
        var positions = await this.positionRepository.getAllAtCompanyAsync(companyId, accountId);

        var positionsDTOs = positions.map(mapPositionToDTO);
        return positionsDTOs;
    }

    public async addPosition(positionDTO: PositionDTO, accountId: number) {
    
        const createPositionObject: Prisma.PositionCreateInput = {
            title: positionDTO.title,
            sourceUrl: positionDTO.sourceUrl,
            company: {
                connect: { id: positionDTO.company?.id!}
            },
            account: {
                connect: { id: accountId }
            }
        }

        await this.positionRepository.createAsync(createPositionObject);
    }
    
    public async updatePosition(positionDTO: PositionDTO) {

        const updatePositionObject: Prisma.PositionUpdateInput = {
            title: positionDTO.title,
            sourceUrl: positionDTO.sourceUrl,
            company: {
                connect: { id: positionDTO.company?.id! }
            }
        }

        await this.positionRepository.updateAsync(updatePositionObject, positionDTO.id!);
    }

    public async deletePosition(positionId: number, accountId: number) {
        await this.positionRepository.deleteAsync(positionId, accountId);
    }
}
