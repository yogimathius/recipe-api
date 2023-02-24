import { Injectable } from '@nestjs/common';
import { NewRecipeInput } from './dto/new-recipe.input';
import { RecipesArgs } from './dto/recipes.args';
import { UpdateRecipeInput } from './dto/update-recipe.input';
import { Recipe } from './models/recipe.model';

@Injectable()
export class RecipesService {
  private readonly recipes: Recipe[] = [];

  async create(newRecipeData: NewRecipeInput): Promise<Recipe> {
    const recipe = {
      id: (this.recipes.length + 1).toString(),
      ...newRecipeData,
    };
    this.recipes.push(recipe);
    return recipe;
  }

  async findOneById(id: string): Promise<Recipe> {
    return this.recipes.find(recipe => recipe.id === id);
  }

  async findAll(recipesArgs: RecipesArgs): Promise<Recipe[]> {
    const { page, limit } = recipesArgs;
    return this.recipes.slice((page - 1) * limit, page * limit);
  }

  async remove(id: string): Promise<boolean> {
    const recipeIndex = this.recipes.findIndex(recipe => recipe.id === id);
    if (recipeIndex >= 0) {
      this.recipes.splice(recipeIndex, 1);
      return true;
    }
    return false;
  }

  async update(id: string, updateRecipeData: UpdateRecipeInput): Promise<Recipe> {
    const recipe = this.recipes.find(recipe => recipe.id === id);
    if (!recipe) {
      throw new Error(`Recipe with ID ${id} not found`);
    }
    Object.assign(recipe, updateRecipeData);
    return recipe;
  }
}
