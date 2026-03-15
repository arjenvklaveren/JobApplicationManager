import type { LoginDTO, RegisterDTO } from '@jobapplicationmanager/shared';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { AccountRepository } from './account.repository';
import { Account, Prisma } from 'generated/prisma/browser';
import * as argon from 'argon2'

@Injectable()
export class AccountService {
    constructor(private accountRepository: AccountRepository, private authService: AuthService) { }

    public async login(loginDTO: LoginDTO) : Promise<{ access_token: string }> {

        let account: Account | null = await this.accountRepository.findByNameAsync(loginDTO.username); 

        if (!account) {
            throw new UnauthorizedException("Account not found");
        }

        if (!(await argon.verify(account.password, loginDTO.password))) {
            throw new UnauthorizedException("Incorrect password");
        }
        
        const access_token: { access_token: string } = await this.authService.generateToken(account);
        return access_token;
    }

    public async create(registerDTO: RegisterDTO) {

        registerDTO.password = await argon.hash(registerDTO.password);
        
        var accountApplicationObject = {
            name: registerDTO.name,
            password: registerDTO.password,
            applicant: {
                create: {
                    city: registerDTO.city
                }
            }
        };

        await this.accountRepository.createNewAsync(accountApplicationObject);
    }
}
