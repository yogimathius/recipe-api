import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, JoinTable, OneToMany } from 'typeorm';
import { Ingredient } from './ingredient.entity';
import { Instruction } from './instruction.entity';

@Entity()
@ObjectType()
export class Recipe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description?: string;

  @OneToMany(() => Recipe, recipe => recipe.ingredients)
  @JoinTable()
  ingredients: Ingredient[];

  @OneToMany(() => Recipe, recipe => recipe.instructions)
  @JoinTable()
  instructions: Instruction[];
}
