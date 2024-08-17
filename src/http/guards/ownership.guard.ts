import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class OwnershipGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly reflector: Reflector
    ) { }

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        const userId = request.params.id;

        // console.log(`Authenticated User ID: ${user.id}`);
        // console.log(`Requested User ID: ${userId}`);

        if (!user || !userId) {
            throw new ForbiddenException('You are not allowed to access this resource');
        }

        if (String(user.id) !== String(userId)) {
            throw new ForbiddenException('You are not allowed to access this resource');
        }

        return true;
    }
}
