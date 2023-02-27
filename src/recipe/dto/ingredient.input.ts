import { InputType, Field } from '@nestjs/graphql';
import { Exclude } from 'class-transformer';
import { IsString, IsNotEmpty } from 'class-validator';
import { NewRecipeInput } from './new-recipe.input';

@InputType()
export class IngredientInput {
    @Exclude()
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
    @Field(type => NewRecipeInput)
    recipe: NewRecipeInput;
}