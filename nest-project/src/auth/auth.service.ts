import type { LoginDTO } from '@jobapplicationmanager/shared';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) {}

    public async authenticateCreds(loginDTO: LoginDTO) : Promise<{ access_token: string }> {

        if (loginDTO.username != "test" && loginDTO.password != "test") {
            throw new UnauthorizedException();
        }

        loginDTO.id = 0;
        const tokenPayload = { 
            sub: loginDTO.id,
            username: loginDTO.username
        }

        const jwt_access_token = await this.jwtService.signAsync(tokenPayload)

        return {
            access_token: jwt_access_token
        };
    }
}
