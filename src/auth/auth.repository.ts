import {
  ConflictException,
  InternalServerErrorException,
} from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { AuthCredentialsDto } from "./dto/auth-credentials-dto";
import { User } from "./user.entity";
import * as bcrypt from "bcrypt";

@EntityRepository(User)
export class AuthRepository extends Repository<User> {
  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    const salt = await bcrypt.genSalt();

    const user = new User();
    user.username = username;
    user.password = await this.hashPassword(password, salt);
    user.salt = salt;

    try {
      await user.save();
    } catch (error) {
      if (error.code === "23505") {
        throw new ConflictException("Username è già in uso");
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
