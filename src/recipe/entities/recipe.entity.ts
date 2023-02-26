import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Ingredient } from './ingredient.entity';
import { Instruction } from './instruction.entity';

@Entity()
export class Recipe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description?: string;

  @OneToMany(() => Ingredient, ingredient => ingredient.recipe)
  @JoinTable()
  ingredients: Ingredient[];

  @OneToMany(() => Instruction, instruction => instruction.recipe)
  @JoinTable()
  instructions: Instruction[];
}
