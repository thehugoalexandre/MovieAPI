import { Controller, Patch, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { IsOwnerGuard } from '@/src/http/guards/is-owner.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResourceType } from '@/src/http/common/decorators/resource-type.decorator';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    // @UseGuards(IsOwnerGuard)
    // @ResourceType('user')
    @Patch(':id')
    updateUser(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(id, updateUserDto);
    }

    // @UseGuards(IsOwnerGuard)
    // @ResourceType('user')
    @Delete(':id')
    deleteUser(@Param('id') id: number) {
        return this.usersService.delete(id);
    }
}
