import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateAccountInput } from './dtos/create-account.dto';
import { LoginInput } from './dtos/login.dto';
import { JwtService } from 'src/jwt/jwt.service';
import { EditProfileInput, EditProfileOutput } from './dtos/edit-profile.dto';
import { Verification } from './entities/verification.entity';
import { VerifyEmailOutput } from './dtos/verify-email.dto';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    @InjectRepository(Verification)
    private readonly verifications: Repository<Verification>,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  async createAccount({ email, password, role }: CreateAccountInput): Promise<{
    ok: boolean;
    error?: string;
  }> {
    try {
      const exists = await this.users.findOne({ where: { email } });

      if (exists) {
        return { ok: false, error: '이미 존재하는 이메일입니다.' };
      }

      const newUser = this.users.create({ email, password, role });

      const user = await this.users.save(newUser);

      const newVerification = this.verifications.create({ user });
      const verification = await this.verifications.save(newVerification);

      this.mailService.sendVerificationEmail(email, verification.code);

      return { ok: true };
    } catch (error) {
      return { ok: false, error: '아이디 생성에 실패했습니다.' };
    }
  }

  async login({ email, password }: LoginInput) {
    try {
      const user = await this.users.findOne({
        where: {
          email,
        },
        select: ['password'],
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

      const token = this.jwtService.sign(user.id);

      return {
        ok: true,
        token,
      };
    } catch (error) {
      return { ok: false, error: '로그인에 실패했습니다.' };
    }
  }

  async findById(id: number) {
    try {
      const user = await this.users.findOne({
        where: {
          id,
        },
      });

      if (!user) {
        throw new Error();
      }

      return {
        ok: true,
        user,
      };
    } catch (error) {
      return {
        ok: false,
        error: '유저를 찾지 못했습니다.',
      };
    }
  }

  async editProfile(
    userId: number,
    { email, password }: EditProfileInput,
  ): Promise<EditProfileOutput> {
    try {
      const user = await this.users.findOne({
        where: {
          id: userId,
        },
      });

      if (email) {
        user.email = email;
        user.verified = false;

        const newVerification = this.verifications.create({ user });
        const verification = await this.verifications.save(newVerification);

        this.mailService.sendVerificationEmail(email, verification.code);
      }

      if (password) {
        user.password = password;
      }

      await this.users.save(user);

      return { ok: true };
    } catch (error) {
      return { ok: false, error: '프로필 변경에 실패했습니다.' };
    }
  }

  async verifyEmail(code: string): Promise<VerifyEmailOutput> {
    try {
      const verification = await this.verifications.findOne({
        where: { code },
        relations: ['user'],
      });

      if (verification) {
        verification.user.verified = true;
        this.users.save(verification.user);

        return { ok: true };
      }

      return { ok: false, error: '이메일 검증에 실패했습니다.' };
    } catch (error) {
      return { ok: false, error };
    }
  }
}
