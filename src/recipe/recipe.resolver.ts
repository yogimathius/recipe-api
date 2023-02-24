import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Recipe } from './recipe.model';

@Resolver()
export class RecipeResolver {
  private recipes: Recipe[] = [];

  @Query(() => Recipe)
  recipe(@Args('id') id: string): Recipe {
    return this.recipes.find(recipe => recipe.id === id);
  }

  @Query(() => [Recipe])
  recipeList(): Recipe[] {
    return this.recipes;
  }

  @Mutation(() => Recipe)
  async createRecipe(
    @Args('name') name: string,
    @Args('description') description: string,
    @Args('ingredients') ingredients: string[],
    @Args('instructions') instructions: string[],
  ): Promise<Recipe> {
    const recipe: Recipe = {
      id: Math.random().toString(),
      name,
      description,
      ingredients,
      instructions,
    };
    this.recipes.push(recipe);
    return recipe;
  }

  @Mutation(() => Recipe)
  updateRecipe(
    @Args('id') id: string,
    @Args('name') name: string,
    @Args('description') description: string,
    @Args('ingredients') ingredients: string[],
    @Args('instructions') instructions: string[],
  ): Recipe {
    const recipeIndex = this.recipes.findIndex(recipe => recipe.id === id);
    const recipe: Recipe = {
      id,
      name,
      description,
      ingredients,
      instructions,
    };
    this.recipes[recipeIndex] = recipe;
    return recipe;
  }

  @Mutation(() => String)
  deleteRecipe(@Args('id') id: string): string {
    const recipeIndex = this.recipes.findIndex(recipe => recipe.id === id);
    this.recipes.splice(recipeIndex, 1);
    return id;
  }
}
