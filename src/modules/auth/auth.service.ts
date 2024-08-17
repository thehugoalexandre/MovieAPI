import { Injectable, UnauthorizedException, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { SignUpDto } from './dto/signUp.dto';
import { SignInDto } from './dto/signIn.dto';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { QueryFailedError } from 'typeorm';
import { CustomLoggerService } from '@/src/http/logger/logger.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly logger: CustomLoggerService,
  ) { }

  async signUp(signUpDto: SignUpDto) {
    const existingUser = await this.usersService.findByEmail(signUpDto.email);
    if (existingUser) {
      this.logger.warn(`Signup attempt with existing email: ${signUpDto.email}`);
      throw new ConflictException('Email already in use');
    }
    try {
      const user = await this.usersService.create(signUpDto);
      return this.generateTokens(user);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new InternalServerErrorException('Database error occurred during sign up');
      }
      throw new InternalServerErrorException('An unexpected error occurred');
    }
  }


  async signIn(signInDto: SignInDto) {
    const user = await this.usersService.findByEmail(signInDto.email);
    if (!user || !(await bcrypt.compare(signInDto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.generateTokens(user);
  }

  private generateTokens(user: any) {
    const payload: JwtPayload = {
      id: user.id,
      email: user.email,
    };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }
}
