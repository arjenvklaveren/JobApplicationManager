import type { LoginDTO } from '@jobapplicationmanager/shared';
import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class AccountService {
    constructor(private authService: AuthService) { }

    public async login(loginDTO: LoginDTO) {

        //If user is found, continue authenticating
        
        await this.authService.authenticateCreds(loginDTO);
    }
}
