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

  @ManyToOne(() => Recipe, (recipe) => recipe.instructions)
  recipe: Recipe;
}
