import { Body, Controller, Post, ValidationPipe } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthCredentialsDto } from "./dto/auth-credentials-dto";

@Controller("auth")
export class AuthController {
  constructor(private service: AuthService) {}

  @Post("/signup")
  signUp(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto
  ): Promise<void> {
    return this.service.signUp(authCredentialsDto);
  }

  @Post("/signin")
  signIn(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto
  ): Promise<void> {
    return this.service.signIn(authCredentialsDto);
  }
}
