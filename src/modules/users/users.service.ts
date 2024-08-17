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

    async findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    async findByEmail(email: string): Promise<User | undefined> {
        return this.usersRepository.findOne({ where: { email } });
    }

    async findById(id: string): Promise<UserResponseDto> {
        const user = await this.usersRepository.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return this.toUserResponseDto(user);
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<UserResponseDto> {
        let user = await this.usersRepository.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }

        if (updateUserDto.name) {
            user.name = updateUserDto.name;
        }

        const updatedUser = await this.usersRepository.save(user);

        return this.toUserResponseDto(updatedUser);
    }

    async delete(id: number): Promise<void> {
        const user = await this.usersRepository.findOne({ where: { id: id.toString() } });
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }

        await this.usersRepository.delete(id);
    }

    public toUserResponseDto(user: User): UserResponseDto {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };
    }
}
