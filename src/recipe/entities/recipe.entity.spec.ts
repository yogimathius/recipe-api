import { Ingredient } from './ingredient.entity';
import { Instruction } from './instruction.entity';
import { Recipe } from './recipe.entity';

const ingredient1 = new Ingredient();
ingredient1.id = 1;
ingredient1.name = 'Ingredient 1';
ingredient1.quantity = 2;
ingredient1.type = "fruit";

const ingredient2 = new Ingredient();
ingredient2.id = 2;
ingredient2.name = 'Ingredient 1';
ingredient2.quantity = 2;
ingredient2.type = "fruit";


const instruction1 = new Instruction();
instruction1.id = 1;
instruction1.step = 1;
instruction1.direction = 'directon 1';

const instruction2 = new Instruction();
instruction2.id = 2;
instruction2.step = 2;
instruction2.direction = 'directon 2';

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
    recipe.instructions = [instruction1, instruction2];
    expect(recipe.instructions).toEqual([instruction1, instruction2]);
  });
});
