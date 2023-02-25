import { Recipe } from './recipe.entity';

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
    recipe.ingredients = ['Ingredient 1', 'Ingredient 2'];
    expect(recipe.ingredients).toEqual(['Ingredient 1', 'Ingredient 2']);
  });

  it('should have instructions', () => {
    const recipe = new Recipe();
    expect(recipe.instructions).toBeUndefined();
    recipe.instructions = ['Step 1', 'Step 2'];
    expect(recipe.instructions).toEqual(['Step 1', 'Step 2']);
  });
});
