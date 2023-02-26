import { EntityRepository, Repository } from 'typeorm';
import { Recipe } from '../entities/recipe.entity';

@EntityRepository(Recipe)
export class RecipeRepository extends Repository<Recipe> {

  async createRecipe(recipeData: Partial<Recipe>): Promise<Recipe> {
    const recipe = this.create(recipeData);
    await this.save(recipe);
    return recipe;
  }

  async updateRecipe(recipeId: number, recipeData: Partial<Recipe>): Promise<Recipe> {
    const recipe = await this.findOne({where: {id: recipeId}});
    if (!recipe) {
      return null;
    }
    Object.assign(recipe, recipeData);
    await this.save(recipe);
    return recipe;
  }

  async deleteRecipe(recipeId: number): Promise<boolean> {
    const result = await this.delete(recipeId);
    return result.affected > 0;
  }

  async getRecipeById(recipeId: number): Promise<Recipe> {
    const recipe = await this.findOne({where: {id: recipeId}});
    return recipe;
  }

  async getAllRecipes(): Promise<Recipe[]> {
    const recipes = await this.find();
    return recipes;
  }
}
