import { MoviesService } from '@/src/modules/movies/movies.service';
import { UsersService } from '@/src/modules/users/users.service';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class IsOwnerGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private usersService: UsersService,
        private moviesService: MoviesService,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        const resourceId = parseInt(request.params.id);
        const resourceType = this.reflector.get<string>('resourceType', context.getHandler());

        if (resourceType === 'user') {
            const userEntity = await this.usersService.findById(resourceId);
            return userEntity && userEntity.id === user.userId;
        }

        if (resourceType === 'movie') {
            const movieEntity = await this.moviesService.findOne(resourceId);
            return movieEntity && movieEntity.id === user.userId;
        }

        return false;
    }
}
