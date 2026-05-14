import { Controller, Get, UseGuards } from '@nestjs/common';
import { ContactPersonService } from './contact-person.service';
import { User } from 'src/auth/decorators/user.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('contact-person')
export class ContactPersonController {
    constructor(private contactPersonService: ContactPersonService) { }
    
    @Get('get-all')
    public async getContactPeople(@User() user: any) {
        return await this.contactPersonService.getAllAsync(user.sub);
    }
}
