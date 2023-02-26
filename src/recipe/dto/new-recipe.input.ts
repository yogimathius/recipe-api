import { Field, InputType } from '@nestjs/graphql';
import { ArrayNotEmpty, IsOptional, Length, MaxLength } from 'class-validator';
import { OneToMany } from 'typeorm';
import { Ingredient } from '../entities/ingredient.entity';
import { Instruction } from '../entities/instruction.entity';

@InputType()
export class NewRecipeInput {
  @Field()
  @MaxLength(30)
  title: string;

  @Field({ nullable: true })
  @IsOptional()
  @Length(30, 255)
  description?: string;

  @OneToMany(() => Ingredient, ingredient => ingredient, { cascade: true })
  @Field(() => [Ingredient])
  @ArrayNotEmpty()
  ingredients: Ingredient[];
  
  @OneToMany(() => Instruction, ingredient => ingredient, { cascade: true })  
  @Field(() => [Instruction])
  @ArrayNotEmpty()
  instructions: Instruction[];
}