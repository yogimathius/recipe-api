import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewRecipeInput } from './dto/new-recipe.input';
import { RecipesArgs } from './dto/recipes.args';
import { Recipe } from './models/recipe.model';

@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(Recipe)
    private recipeRepository: Repository<Recipe>,
  ) {}

  async create(data: NewRecipeInput): Promise<Recipe> {
    const recipe = this.recipeRepository.create(data);
    return this.recipeRepository.save(recipe);
  }

  async findOneById(id: number): Promise<Recipe> {
    return this.recipeRepository.findOneBy({id});
  }

  async findAll(recipesArgs: RecipesArgs): Promise<Recipe[]> {
    const { page, limit } = recipesArgs;
    return this.recipeRepository.find({
      take: limit,
      skip: (page - 1) * limit,
    });
  }

  async update(id: number, data: Partial<Recipe>): Promise<Recipe> {
    await this.recipeRepository.update(id, data);
    return this.recipeRepository.findOneBy({id});
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.recipeRepository.delete(id);
    return result.affected > 0;
  }
}
