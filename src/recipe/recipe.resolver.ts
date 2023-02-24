import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Recipe } from './models/recipe.model';
import { RecipesService } from './recipe.service';
import { RecipesArgs } from './dto/recipes.args';
import { NewRecipeInput } from './dto/new-recipe.input';
import { UpdateRecipeInput } from './dto/update-recipe.input';

@Resolver(() => Recipe)
export class RecipeResolver {
  constructor(private readonly recipesService: RecipesService) {}

  @Query(() => Recipe)
  async recipe(@Args('id') id: string): Promise<Recipe> {
    return this.recipesService.findOneById(id);
  }

  @Query(() => [Recipe])
  recipes(@Args() recipesArgs: RecipesArgs): Promise<Recipe[]> {
    return this.recipesService.findAll(recipesArgs);
  }

  @Mutation(() => Recipe)
  async createRecipe(
    @Args('newRecipeData') newRecipeData: NewRecipeInput,
  ): Promise<Recipe> {
    return this.recipesService.create(newRecipeData);
  }

  @Mutation(() => Recipe)
  async updateRecipe(
    @Args({ name: 'id', type: () => String }) id: string,
    @Args('updateRecipeInput') updateRecipeInput: UpdateRecipeInput,
  ): Promise<Recipe> {
    return this.recipesService.update(id, updateRecipeInput);
  }

  @Mutation(() => Boolean)
  async deleteRecipe(@Args('id') id: string): Promise<boolean> {
    return this.recipesService.remove(id);
  }
}
