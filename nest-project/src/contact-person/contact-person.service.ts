import { Injectable } from '@nestjs/common';
import { ContactPersonRepository } from './contact-person.repository';
import { mapContactPersonToDTO } from 'helpers/dtoConverterHelper';

@Injectable()
export class ContactPersonService {
    constructor(private contactPersonRepository: ContactPersonRepository) { }
    
    public async getAllAsync(accountId: number) {

        let contactPeople = await this.contactPersonRepository.getAll(accountId);

        let contactPeopleDTOs = contactPeople.map(contactPerson => mapContactPersonToDTO(contactPerson, contactPerson.company));
        return contactPeopleDTOs;
    }

}
