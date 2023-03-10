import { Field, InputType } from '@nestjs/graphql';
import { ArrayNotEmpty, IsArray, IsOptional, Length, MaxLength, ValidateNested } from 'class-validator';
import { Exclude, Type } from 'class-transformer';
import { IngredientInput } from './ingredient.input';
import { InstructionInput } from './instruction.input';

@InputType()
export class NewRecipeInput {
  @Exclude()
  @IsOptional()
  id: number;
  
  @Field()
  @MaxLength(30)
  title: string;

  @Field({ nullable: true })
  @IsOptional()
  @Length(30, 255)
  description?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayNotEmpty()
  @Type(() => InstructionInput)
  @Field(() => [InstructionInput])
  instructions: InstructionInput[];

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayNotEmpty()
  @Type(() => IngredientInput)
  @Field(() => [IngredientInput])
  ingredients: IngredientInput[];
}