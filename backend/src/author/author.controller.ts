import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { Author } from './entities/author.entity';

@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Get()
  showMessage(): string {
    return 'Here comes the Author';
  }

  @Post()
  create(@Body() createAuthorDto: CreateAuthorDto): Promise<CreateAuthorDto> {
    return this.authorService.create(createAuthorDto);
  }

  @Get('/list')
  findAll(): Promise<Author[]> {
    return this.authorService.findAll();
  }

  @Get('/id/:id')
  findOneById(@Param('id') id: string): Promise<Author> {
    return this.authorService.findOneById(id);
  }

  @Get('/name/:name')
  findOneByName(@Param('name') name: string): Promise<Author> {
    return this.authorService.findOneByName(name);
  }

  @Patch('/:id')
  update(
    @Param('id') id: string,
    @Body() updateAuthorDto: UpdateAuthorDto,
  ): Promise<Author> {
    return this.authorService.update(id, updateAuthorDto);
  }

  @Delete('/:id')
  remove(@Param('id') id: string): Promise<string> {
    return this.authorService.remove(id);
  }
}
