import type { LoginDTO } from '@jobapplicationmanager/shared';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Account } from 'generated/prisma/browser';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) {}

    public async generateToken(account: Account): Promise<{ access_token: string }> {
        
        const tokenPayload = { 
            sub: account.id,
            username: account.name
        }

        const jwt_access_token = await this.jwtService.signAsync(tokenPayload)

        return {
            access_token: jwt_access_token
        };
    }
}
