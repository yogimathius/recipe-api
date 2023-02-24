import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { NewRecipeInput } from './new-recipe.input';

@InputType()
export class UpdateRecipeInput extends PartialType(NewRecipeInput) {
  @Field(() => Int)
  id: string;
}
