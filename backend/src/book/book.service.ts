import { Book } from './entities/book.entity';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Repository } from 'typeorm';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  //----------------------------------------------------------------------------->
  async create(createBookDto: CreateBookDto): Promise<CreateBookDto> {
    try {
      await this.bookRepository.save(createBookDto);
      return createBookDto;
    } catch (error) {
      throw new InternalServerErrorException(
        'Error in saving the book in database',
      );
    }
  }

  //----------------------------------------------------------------------------->
  async findAll(): Promise<Book[]> {
    try {
      return await this.bookRepository.find();
    } catch (error) {
      throw new InternalServerErrorException('Impossible to find all books');
    }
  }

  //----------------------------------------------------------------------------->
  async findOneById(id: string): Promise<Book> {
    const book = this.bookRepository
      .createQueryBuilder('book')
      .select(['book.name', 'book.date'])
      .where('book.id = :id', { id: id })
      .getOne();
    if (!book) throw new NotFoundException('Book not found');
    return book;
  }

  //----------------------------------------------------------------------------->
  async findOneByName(name: string): Promise<Book> {
    const book = this.bookRepository
      .createQueryBuilder('book')
      .select(['book.name', 'book.date'])
      .where('book.name = :name', { name: name })
      .getOne();
    if (!book) throw new NotFoundException('Book not found');
    return book;
  }

  //----------------------------------------------------------------------------->
  async update(id: string, updateBookDto: UpdateBookDto): Promise<Book> {
    const book = await this.bookRepository.findOneBy({ id });
    book.name = updateBookDto.name ? updateBookDto.name : book.name;
    book.date = updateBookDto.date ? updateBookDto.date : book.date;
    try {
      await this.bookRepository.save(book);
      return this.findOneById(id);
    } catch (error) {
      throw new InternalServerErrorException(
        'Error in saving the book in database',
      );
    }
  }

  //----------------------------------------------------------------------------->
  async remove(id: string): Promise<string> {
    const deleteAction = await this.bookRepository.delete({ id });
    if (deleteAction.affected === 0) {
      throw new NotFoundException('Not found a book with the informed ID');
    }
    return 'The Book was successfully removed';
  }
}
