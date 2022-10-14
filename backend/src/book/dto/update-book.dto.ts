import { IsDate, IsString } from 'class-validator';

export class UpdateBookDto {
  @IsString({
    message: 'Inform a valid name',
  })
  name: string;

  @IsDate({
    message: 'Inform a valid date',
  })
  date: string;
}
