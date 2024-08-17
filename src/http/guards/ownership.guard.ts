import { UsersService } from '@/src/modules/users/users.service';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class OwnershipGuard implements CanActivate {
    constructor(
        private usersService: UsersService,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        const resourceId = request.params.id;

        const userEntity = await this.usersService.findById(resourceId);
        return userEntity && userEntity.id === user.id;
    }
}
