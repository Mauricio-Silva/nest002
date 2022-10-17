import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class Publisher {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;
}
