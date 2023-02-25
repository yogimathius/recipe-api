import { Field, InputType } from '@nestjs/graphql';
import { ArrayNotEmpty, IsNotEmpty, IsOptional, Length, MaxLength } from 'class-validator';

@InputType()
export class NewRecipeInput {
  @Field()
  @MaxLength(30)
  title: string;

  @Field({ nullable: true })
  @IsOptional()
  @Length(30, 255)
  description?: string;

  @Field(() => [String])
  @ArrayNotEmpty()
  ingredients: string[];
  
  @Field(() => [String])
  @ArrayNotEmpty()
  instructions: string[];
}