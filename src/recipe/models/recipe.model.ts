import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { ManyToMany, OneToMany } from 'typeorm';
import { Ingredient } from './ingredient.model';
import { Instruction } from './instruction.model';

@ObjectType({ description: 'recipe ' })
export class Recipe {
  @Field(type => ID)
  id: number;

  @Directive('@upper')
  title: string;

  @Field({ nullable: true })
  description?: string;

  @OneToMany(() => Ingredient, ingredient => ingredient.recipe)
  @Field(() => [Ingredient])
  ingredients: Ingredient[] = [];

  @OneToMany(() => Instruction, instruction => instruction.recipe)
  @Field(() => [Instruction])
  instructions: Instruction[] = [];
}