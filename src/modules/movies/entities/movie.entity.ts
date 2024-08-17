import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { Genre } from '../genres/entities/genre.entity';

@Entity('movies')
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false })
  releaseDate: Date;

  @ManyToMany(() => Genre, genre => genre.movies, { cascade: true })
  @JoinTable()
  genres: Genre[];
}
