import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Recipe } from './recipe.entity';

@Entity()
export class Ingredient {
  @PrimaryGeneratedColumn()
  id: number = Math.random();

  @Column()
  name: string;

  @Column()
  type: string;

  @Column()
  quantity: number;

  @ManyToOne(() => Ingredient, Ingredient => Ingredient.recipe)
  recipe: Recipe;
}
