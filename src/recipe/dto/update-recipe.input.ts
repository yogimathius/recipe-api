import { InputType, Field } from '@nestjs/graphql';
import { IsOptional, Length, MaxLength } from 'class-validator';

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

  @Field(type => [String])
  @IsOptional()
  ingredients: string[];
  
  @Field(type => [String])
  @IsOptional()
  instructions: string[];
}
