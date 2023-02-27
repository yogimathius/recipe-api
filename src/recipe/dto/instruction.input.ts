import { InputType, Field } from '@nestjs/graphql';
import { Exclude } from 'class-transformer';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { NewRecipeInput } from './new-recipe.input';

@InputType()
export class InstructionInput {
    @IsOptional()
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