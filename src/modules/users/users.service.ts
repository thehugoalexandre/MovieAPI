import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { SignUpDto } from '../auth/dto/signUp.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { UserResponseDto } from './dto/user-response.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    async create(registerDto: SignUpDto): Promise<UserResponseDto> {
        const existingUser = await this.findByEmail(registerDto.email);
        if (existingUser) {
            throw new ConflictException('Email already in use');
        }

        const user = this.usersRepository.create(registerDto);
        const savedUser = await this.usersRepository.save(user);
        return this.toUserResponseDto(savedUser);
    }

    async findByEmail(email: string): Promise<User | undefined> {
        return this.usersRepository.findOne({ where: { email } });
    }

    async findById(id: number): Promise<UserResponseDto> {
        const user = await this.usersRepository.findOne({ where: { id: String(id) } });
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return this.toUserResponseDto(user);
    }

    async update(id: number, updateUserDto: UpdateUserDto): Promise<UserResponseDto> {
        let user = await this.usersRepository.findOne({ where: { id: String(id) } });
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }

        if (updateUserDto.password) {
            updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
        }

        user = this.usersRepository.merge(user, updateUserDto);
        const updatedUser = await this.usersRepository.save(user);

        return this.toUserResponseDto(updatedUser);
    }

    async delete(id: number): Promise<void> {
        const result = await this.usersRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
    }

    private toUserResponseDto(user: User): UserResponseDto {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };
    }
}
