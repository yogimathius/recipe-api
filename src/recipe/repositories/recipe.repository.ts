import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Ingredient } from '../entities/ingredient.entity';
import { Instruction } from '../entities/instruction.entity';
import { Recipe } from '../entities/recipe.entity';
import { IngredientRepository } from './ingredient.repository';
import { InstructionRepository } from './instruction.repository';

@Injectable()
export class RecipeRepository extends Repository<Recipe> {
  constructor(
    @InjectRepository(Recipe) manager: EntityManager,
    @InjectRepository(Ingredient) private ingredientRepository: IngredientRepository,
    @InjectRepository(Instruction) private instructionRepository: InstructionRepository,
  ) {
    super(Recipe, manager);
  }
}
