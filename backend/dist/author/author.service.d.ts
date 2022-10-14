import { Author } from './entities/author.entity';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { Repository } from 'typeorm';
export declare class AuthorService {
    private authorRepository;
    constructor(authorRepository: Repository<Author>);
    create(createAuthorDto: CreateAuthorDto): Promise<CreateAuthorDto>;
    findAll(): Promise<Author[]>;
    findOneById(id: string): Promise<Author>;
    findOneByName(name: string): Promise<Author>;
    update(id: string, updateAuthorDto: UpdateAuthorDto): Promise<Author>;
    remove(id: string): Promise<string>;
}
