import { Injectable } from '@nestjs/common';
import { ApplicationRepository } from './application.repository';
import { mapApplicationToDTO } from 'helpers/dtoConverterHelper';

@Injectable()
export class ApplicationService {
    constructor(private applicationRepository: ApplicationRepository) { }
    
    public async getAllAsync(accountId: number) {
        
        let applications = await this.applicationRepository.getAll(accountId);

        let applicationsDTOs = applications.map(application => mapApplicationToDTO(application, application.position, application.applicant));
        return applicationsDTOs;
    }

}
