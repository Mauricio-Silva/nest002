import { IsString } from 'class-validator';

export class UpdateAuthorDto {
  @IsString({
    message: 'Inform a valid author name',
  })
  name: string;
}
