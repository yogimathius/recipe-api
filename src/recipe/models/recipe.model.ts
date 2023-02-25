import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { ManyToMany } from 'typeorm';
import { Ingredient } from './ingredient.model';

@ObjectType({ description: 'recipe ' })
export class Recipe {
  @Field(type => ID)
  id: number;

  @Directive('@upper')
  title: string;

  @Field({ nullable: true })
  description?: string;

  @ManyToMany(() => Ingredient, ingredient => ingredient.recipes)
  @Field(() => [Ingredient])
  ingredients: Ingredient[];

  @Field(type => [String])
  instructions: string[] = [];
}