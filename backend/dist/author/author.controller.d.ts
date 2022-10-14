import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { Author } from './entities/author.entity';
export declare class AuthorController {
    private readonly authorService;
    constructor(authorService: AuthorService);
    showMessage(): string;
    create(createAuthorDto: CreateAuthorDto): Promise<CreateAuthorDto>;
    findAll(): Promise<Author[]>;
    findOneById(id: string): Promise<Author>;
    findOneByName(name: string): Promise<Author>;
    update(id: string, updateAuthorDto: UpdateAuthorDto): Promise<Author>;
    remove(id: string): Promise<string>;
}
