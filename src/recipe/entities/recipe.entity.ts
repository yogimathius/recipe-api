import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Recipe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description?: string;

  @Column()
  ingredients: string[];

  @Column()
  instructions: string[];
}
