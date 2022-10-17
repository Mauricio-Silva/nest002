import { Author } from './../../author/entities/author.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Genre } from '../enum/book.enum';

@Entity()
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  date: string;

  @Column()
  genres: Genre[];

  @ManyToOne(() => Author, (author) => author.books)
  author: Author;
}
