import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { JoinTable } from 'typeorm';
import { Ingredient } from './ingredient.model';
import { Instruction } from './instruction.model';

@ObjectType({ description: 'recipe ' })
export class Recipe {
  @Field(() => ID)
  id: number;

  @Directive('@upper')
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => [Ingredient])
  ingredients: Ingredient[] = [];

  @Field(() => [Instruction])
  instructions: Instruction[] = [];
}