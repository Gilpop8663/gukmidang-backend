import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateAccountInput } from './dtos/create-account.dto';
import { LoginInput } from './dtos/login.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
  ) {}

  async createAccount({ email, password, role }: CreateAccountInput): Promise<{
    ok: boolean;
    error?: string;
  }> {
    const exists = await this.users.findOne({ where: { email } });

    if (!exists) {
      return { ok: false, error: '이미 존재하는 이메일입니다.' };
    }

    const newUser = this.users.create({ email, password, role });

    await this.users.save(newUser);

    return { ok: true };
  }

  async login({ email, password }: LoginInput) {
    const user = await this.users.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      return {
        ok: false,
        error: '입력한 이메일이 존재하지 않습니다.',
      };
    }

    const isPasswordCorrect = await user.checkPassword(password);

    if (!isPasswordCorrect) {
      return {
        ok: false,
        error: '비밀번호가 맞지 않습니다.',
      };
    }

    return {
      ok: true,
      token: 'asdasds',
    };
  }
}
