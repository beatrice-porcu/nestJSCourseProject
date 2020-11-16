import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthRepository } from "./auth.repository";
import { AuthCredentialsDto } from "./dto/auth-credentials-dto";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthRepository)
    private authRepository: AuthRepository
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authRepository.signUp(authCredentialsDto);
  }

  async signIn(authCredentialsDto: AuthCredentialsDto) {
    const result = await this.authRepository.validateUserPsw(
      authCredentialsDto
    );

    if (!result) {
      throw new UnauthorizedException("Credenziali invalide");
    }
  }
}
