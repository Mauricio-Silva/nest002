import { Author } from './entities/author.entity';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author)
    private authorRepository: Repository<Author>,
  ) {}

  //----------------------------------------------------------------------------->
  async create(createAuthorDto: CreateAuthorDto): Promise<CreateAuthorDto> {
    try {
      await this.authorRepository.save(createAuthorDto);
      return createAuthorDto;
    } catch (error) {
      throw new InternalServerErrorException(
        'Error in saving the author in database',
      );
    }
  }

  //----------------------------------------------------------------------------->
  async findAll(): Promise<Author[]> {
    try {
      return await this.authorRepository.find();
    } catch (error) {
      throw new InternalServerErrorException('Impossible to find all authors');
    }
  }

  //----------------------------------------------------------------------------->
  async findOneById(id: string): Promise<Author> {
    const author = this.authorRepository
      .createQueryBuilder('author')
      .select(['author.name'])
      .where('author.id = :id', { id: id })
      .getOne();
    if (!author) throw new NotFoundException('Author not found');
    return author;
  }

  //----------------------------------------------------------------------------->
  async findOneByName(name: string): Promise<Author> {
    const author = this.authorRepository
      .createQueryBuilder('author')
      .select(['author.name'])
      .where('author.name = :name', { name: name })
      .getOne();
    if (!author) throw new NotFoundException('Author not found');
    return author;
  }

  //----------------------------------------------------------------------------->
  async update(id: string, updateAuthorDto: UpdateAuthorDto): Promise<Author> {
    const author = await this.authorRepository.findOneBy({ id });
    author.name = updateAuthorDto.name ? updateAuthorDto.name : author.name;
    try {
      await this.authorRepository.save(author);
      return this.findOneById(id);
    } catch (error) {
      throw new InternalServerErrorException(
        'Error in saving the author in database',
      );
    }
  }

  //----------------------------------------------------------------------------->
  async remove(id: string): Promise<string> {
    const deleteAction = await this.authorRepository.delete({ id });
    if (deleteAction.affected === 0) {
      throw new NotFoundException('Not found an author with the informed ID');
    }
    return 'The Author was successfully removed';
  }
}
