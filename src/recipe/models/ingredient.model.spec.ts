import { Ingredient } from './ingredient.model';
import { Recipe } from './recipe.model';

describe('Ingredient', () => {
    describe('properties', () => {
      it('should have a numeric id property', () => {
        const ingredient = new Ingredient();
        ingredient.id = 1;
        expect(typeof ingredient.id).toBe('number');
      });
  
      it('should have a string name property', () => {
        const ingredient = new Ingredient();
        ingredient.name = 'Test Ingredient';
        expect(typeof ingredient.name).toBe('string');
      });
  
      it('should have a string type property', () => {
        const ingredient = new Ingredient();
        ingredient.type = 'Test Type';
        expect(typeof ingredient.type).toBe('string');
      });
  
      it('should have a numeric quantity property', () => {
        const ingredient = new Ingredient();
        ingredient.quantity = 2;
        expect(typeof ingredient.quantity).toBe('number');
      });
  
      it('should have a Recipe property', () => {
        const ingredient = new Ingredient();
        ingredient.recipe = new Recipe(); // or set it to an existing recipe instance
        expect(typeof ingredient.recipe).toBe('object');
        expect(ingredient.recipe instanceof Recipe).toBe(true);
      });
    });
  });
  
