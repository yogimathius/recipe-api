import { Ingredient } from './ingredient.entity';
import { Recipe } from './recipe.entity';

describe('Ingredient entity', () => {
  it('should have a numeric id property', () => {
    const ingredient = new Ingredient();
    expect(typeof ingredient.id).toBe('number');
  });

  it('should have a string name property', () => {
    const ingredient = new Ingredient();
    ingredient.name = 'Sugar';
    expect(typeof ingredient.name).toBe('string');
  });
  
  it('should have a string type property', () => {
    const ingredient = new Ingredient();
    ingredient.type = 'Sweetener';
    expect(typeof ingredient.type).toBe('string');
  });
  
  it('should have a numeric quantity property', () => {
    const ingredient = new Ingredient();
    ingredient.quantity = 10;
    expect(typeof ingredient.quantity).toBe('number');
  });

  it('should have a recipe property', () => {
    const recipe = new Recipe();
    const ingredient = new Ingredient();
    ingredient.recipe = recipe;
    expect(ingredient.recipe).toBeDefined();
  });
});
