import { InputType, Field } from '@nestjs/graphql';
import { IsOptional, Length, MaxLength } from 'class-validator';
import { OneToMany } from 'typeorm';
import { Ingredient } from '../entities/ingredient.entity';
import { Instruction } from '../entities/instruction.entity';

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

  @OneToMany(() => Ingredient, ingredient => ingredient, { cascade: true })
  @Field(() => [Ingredient])
  ingredients: Ingredient[];

  @OneToMany(() => Instruction, ingredient => ingredient, { cascade: true })
  @Field(type => [Instruction])
  @IsOptional()
  instructions: Instruction[];
}
