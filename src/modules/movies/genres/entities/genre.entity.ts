import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Movie } from '../../entities/movie.entity';

@Entity('genres')
export class Genre {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @ManyToMany(() => Movie, movie => movie.genres)
  movies: Movie[];
}
