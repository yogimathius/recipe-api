import { InputType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsOptional, Length, MaxLength } from 'class-validator';
import { OneToMany } from 'typeorm';
import { Ingredient } from '../entities/ingredient.entity';
import { Instruction } from '../entities/instruction.entity';
import { IngredientInput } from './ingredient.input';
import { InstructionInput } from './instruction.input';

@InputType()
export class UpdateRecipeInput {
  @Field(() => Number)
  id: number;

  @MaxLength(30)
  @IsOptional()
  title: string;

  @Field({ nullable: true })
  @IsOptional()
  @Length(30, 255)
  description?: string;

  @OneToMany(() => Instruction, ingredient => ingredient, { cascade: true })
  @Type(() => InstructionInput)
  @Field(() => [InstructionInput])
  instructions: InstructionInput[];

  @OneToMany(() => Ingredient, ingredient => ingredient, { cascade: true })
  @Type(() => IngredientInput)
  @Field(() => [IngredientInput])
  ingredients: IngredientInput[];
}
