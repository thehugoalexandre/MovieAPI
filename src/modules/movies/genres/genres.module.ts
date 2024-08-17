import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Genre } from './entities/genre.entity';
import { GenresService } from './genres.service';
import { GenresController } from './genres.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Genre])],
    providers: [GenresService],
    controllers: [GenresController],
    exports: [GenresService]
})
export class GenresModule { }
