import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewRecipeInput } from './dto/new-recipe.input';
import { RecipesArgs } from './dto/recipes.args';
import { Recipe } from './models/recipe.model';
import { RecipeRepository } from './repositories/recipe.repository';

@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(Recipe)
    private recipeRepository: RecipeRepository,
  ) {}

  async create(data: NewRecipeInput): Promise<Recipe> {
    return await this.recipeRepository.save(data);
  }

  async findOneById(id: number): Promise<Recipe> {
    return this.recipeRepository.findOneBy({id});
  }

  async findAll(recipesArgs: RecipesArgs): Promise<Recipe[]> {
    const { page, limit } = recipesArgs;
    return this.recipeRepository.find({
      take: limit,
      skip: (page - 1) * limit,
      relations: {
        instructions: true,
        ingredients: true,
      },
    });
  }

  async update(id: number, data: Partial<Recipe>): Promise<Recipe> {
    await this.recipeRepository.update(id, data);
    
    return this.recipeRepository.findOneBy({id});
  }

  async remove(id: number): Promise<boolean> {
    const recipeFound = await this.recipeRepository.findOneBy({id})
    if (!recipeFound) {
      return false;
    }
    const result = await this.recipeRepository.delete(id);
    
    return result.affected > 0;
  }
}
