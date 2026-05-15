import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { ContactPersonService } from './contact-person.service';
import { User } from 'src/auth/decorators/user.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import type { ContactPersonDTO } from '@jobapplicationmanager/shared';
import { BaseController } from 'src/base/base.controller';

@UseGuards(AuthGuard)
@Controller('contact-person')
export class ContactPersonController extends BaseController<ContactPersonDTO> {
    constructor(private contactPersonService: ContactPersonService) { 
        super(contactPersonService);
    }
}
