import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { OwnershipGuard } from '@/src/http/guards/ownership.guard';
import { MoviesModule } from '../movies/movies.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        MoviesModule,
    ],
    controllers: [UsersController],
    providers: [UsersService, OwnershipGuard],
    exports: [UsersService],
})
export class UsersModule { }
