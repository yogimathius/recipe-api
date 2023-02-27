import { InputType, Field } from '@nestjs/graphql';
import { Exclude } from 'class-transformer';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { NewRecipeInput } from './new-recipe.input';

@InputType()
export class IngredientInput {
    @Exclude()
    @IsOptional()
    id: number;
    
    @IsNotEmpty()
    @IsString()
    @Field()
    name: string;

    @IsNotEmpty()
    @IsString()
    @Field()
    type: string;

    @IsNotEmpty()
    @IsString()
    @Field()
    quantity: number;

    @Exclude()
    @IsOptional()
    recipe: NewRecipeInput;
}