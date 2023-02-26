import { Ingredient } from './ingredient.entity';
import { Recipe } from './recipe.entity';

const ingredient1 = new Ingredient();
ingredient1.id = 1;
ingredient1.name = 'Ingredient 1';
ingredient1.quantity = 2;
ingredient1.type = "fruit";

const ingredient2 = new Ingredient();
ingredient1.id = 2;
ingredient1.name = 'Ingredient 1';
ingredient1.quantity = 2;
ingredient1.type = "fruit";

describe('Recipe Entity', () => {
  it('should create a recipe instance', () => {
    const recipe = new Recipe();
    expect(recipe).toBeDefined();
  });

  it('should have a generated id', () => {
    const recipe = new Recipe();
    expect(recipe.id).toBeUndefined();
    recipe.id = 1;
    expect(recipe.id).toEqual(1);
  });

  it('should have a title', () => {
    const recipe = new Recipe();
    expect(recipe.title).toBeUndefined();
    recipe.title = 'Test Recipe';
    expect(recipe.title).toEqual('Test Recipe');
  });

  it('should have an optional description', () => {
    const recipe = new Recipe();
    expect(recipe.description).toBeUndefined();
    recipe.description = 'This is a test recipe';
    expect(recipe.description).toEqual('This is a test recipe');
  });

  it('should have ingredients', () => {
    const recipe = new Recipe();
    expect(recipe.ingredients).toBeUndefined();
    recipe.ingredients = [ingredient1, ingredient2],
    expect(recipe.ingredients).toEqual([ingredient1, ingredient2]);
  });

  it('should have instructions', () => {
    const recipe = new Recipe();
    expect(recipe.instructions).toBeUndefined();
    recipe.instructions = ['Step 1', 'Step 2'];
    expect(recipe.instructions).toEqual(['Step 1', 'Step 2']);
  });
});
