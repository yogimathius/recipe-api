import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Ingredient } from './ingredient.entity';
import { Instruction } from './instruction.entity';

@Entity()
@ObjectType()
// @InputType('RecipeInput')
export class Recipe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description?: string;

  @OneToMany(() => Recipe, recipe => recipe.ingredients)
  @JoinTable()
  @Field(() => Ingredient)
  ingredients: Ingredient[];

  @OneToMany(() => Recipe, recipe => recipe.instructions)
  @JoinTable()
  @Field(() => Instruction)
  instructions: Instruction[];
}
