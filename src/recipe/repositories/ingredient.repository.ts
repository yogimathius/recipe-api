import { EntityRepository, Repository } from 'typeorm';
import { Ingredient } from '../entities/ingredient.entity';

@EntityRepository(Ingredient)
export class IngredientRepository extends Repository<Ingredient> {
  // Custom methods can be added here
}
