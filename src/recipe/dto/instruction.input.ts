import { InputType, Field } from '@nestjs/graphql';
import { Exclude } from 'class-transformer';
import { IsString, IsNotEmpty } from 'class-validator';
import { NewRecipeInput } from './new-recipe.input';

@InputType()
export class InstructionInput {
    @Exclude()
    id: number;

  @IsNotEmpty()
  @IsString()
  @Field()
  step: number;

  @IsNotEmpty()
  @IsString()
  @Field()
  direction: string;

  @Exclude()
  @Field(type => NewRecipeInput)
  recipe: NewRecipeInput;
}