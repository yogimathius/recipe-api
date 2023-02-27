import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Recipe } from './recipe.entity';

@Entity()
export class Instruction {
  @PrimaryGeneratedColumn()
  id: number = Math.random();

  @Column()
  step: number;

  @Column()
  direction: string;

  @ManyToOne(() => Instruction, instruction => instruction.recipe)
  recipe: Recipe;
}
