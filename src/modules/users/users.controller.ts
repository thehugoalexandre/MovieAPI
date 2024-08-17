import { Controller, Patch, Delete, Param, Body, UseGuards, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/src/http/guards/jwt.guard';
import { UserResponseDto } from './dto/user-response.dto';
import { OwnershipGuard } from '@/src/http/guards/ownership.guard';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @ApiOperation({ summary: 'Retrieve all users' })
    @ApiResponse({ status: 200, description: 'List of users retrieved successfully.' })
    @Get()
    async findAllUsers(): Promise<UserResponseDto[]> {
        const users = await this.usersService.findAll();
        return users.map(user => this.usersService.toUserResponseDto(user));
    }

    @ApiOperation({ summary: 'Retrieve a user by ID' })
    @ApiResponse({ status: 200, description: 'User retrieved successfully.' })
    @ApiResponse({ status: 404, description: 'User not found.' })
    @Get(':id')
    async findOneUser(@Param('id') id: string): Promise<UserResponseDto> {
        return this.usersService.findById(id);
    }

    @ApiOperation({ summary: 'Update a user by ID' })
    @ApiResponse({ status: 200, description: 'User updated successfully.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiResponse({ status: 404, description: 'User not found.' })
    @UseGuards(OwnershipGuard)
    @Patch(':id')
    async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<UserResponseDto> {
        return this.usersService.update(id, updateUserDto);
    }

    @ApiOperation({ summary: 'Delete a user by ID' })
    @ApiResponse({ status: 204, description: 'User deleted successfully.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiResponse({ status: 404, description: 'User not found.' })
    @UseGuards(OwnershipGuard)
    @Delete(':id')
    async deleteUser(@Param('id') id: number): Promise<void> {
        return this.usersService.delete(id);
    }
}