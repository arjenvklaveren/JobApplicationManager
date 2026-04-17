import { Injectable } from '@nestjs/common';
import { PositionRepository } from './position.repository';
import { mapPositionToDTO } from 'helpers/dtoConverterHelper';

@Injectable()
export class PositionService {
    constructor(private positionRepository: PositionRepository) {}

    public async getAllPositionsFromUser(userId: number) {
        var positions = await this.positionRepository.getAllAsync(userId);

        var positionsDTOs = positions.map(mapPositionToDTO);
        return positionsDTOs;
    }
}
