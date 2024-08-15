import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { IsOwnerGuard } from '@/src/http/guards/is-owner.guard';
import { MoviesModule } from '../movies/movies.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        MoviesModule,
    ],
    controllers: [UsersController],
    providers: [UsersService, IsOwnerGuard],
    exports: [UsersService],
})
export class UsersModule { }
