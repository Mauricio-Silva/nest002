"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorService = void 0;
const author_entity_1 = require("./entities/author.entity");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let AuthorService = class AuthorService {
    constructor(authorRepository) {
        this.authorRepository = authorRepository;
    }
    async create(createAuthorDto) {
        try {
            await this.authorRepository.save(createAuthorDto);
            return createAuthorDto;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error in saving the author in database');
        }
    }
    async findAll() {
        try {
            return await this.authorRepository.find();
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Impossible to find all authors');
        }
    }
    async findOneById(id) {
        const author = this.authorRepository
            .createQueryBuilder('author')
            .select(['author.name'])
            .where('author.id = :id', { id: id })
            .getOne();
        if (!author)
            throw new common_1.NotFoundException('Author not found');
        return author;
    }
    async findOneByName(name) {
        const author = this.authorRepository
            .createQueryBuilder('author')
            .select(['author.name'])
            .where('author.name = :name', { name: name })
            .getOne();
        if (!author)
            throw new common_1.NotFoundException('Author not found');
        return author;
    }
    async update(id, updateAuthorDto) {
        const author = await this.authorRepository.findOneBy({ id });
        author.name = updateAuthorDto.name ? updateAuthorDto.name : author.name;
        try {
            await this.authorRepository.save(author);
            return this.findOneById(id);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error in saving the author in database');
        }
    }
    async remove(id) {
        const deleteAction = await this.authorRepository.delete({ id });
        if (deleteAction.affected === 0) {
            throw new common_1.NotFoundException('Not found an author with the informed ID');
        }
        return 'The Author was successfully removed';
    }
};
AuthorService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(author_entity_1.Author)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AuthorService);
exports.AuthorService = AuthorService;
//# sourceMappingURL=author.service.js.map