import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  showMessage(): string {
    return 'Here comes the Book';
  }

  @Post()
  create(@Body() createBookDto: CreateBookDto): Promise<CreateBookDto> {
    return this.bookService.create(createBookDto);
  }

  @Get('/list')
  findAll(): Promise<Book[]> {
    return this.bookService.findAll();
  }

  @Get('/id/:id')
  findOneById(@Param('id') id: string): Promise<Book> {
    return this.bookService.findOneById(id);
  }

  @Get('/name/:name')
  findOneByName(@Param('name') name: string): Promise<Book> {
    return this.bookService.findOneByName(name);
  }

  @Patch('/:id')
  update(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
  ): Promise<Book> {
    return this.bookService.update(id, updateBookDto);
  }

  @Delete('/:id')
  remove(@Param('id') id: string): Promise<string> {
    return this.bookService.remove(id);
  }
}
