import { Controller, Patch, Delete, Param, Body, UseGuards, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/src/http/guards/jwt.guard';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    // @Patch(':id')
    // async updateUser(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    //     const user = await this.usersService.update(id, updateUserDto);
    //     if (!user) {
    //         throw new NotFoundException(`User with ID ${id} not found`);
    //     }
    //     return user;
    // }

    @Delete(':id')
    async deleteUser(@Param('id') id: number) {
        return this.usersService.delete(id);
    }
}
