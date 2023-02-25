import { validate } from 'class-validator';
import { NewRecipeInput } from './new-recipe.input';

describe('NewRecipeInput', () => {
  it('should be valid with all fields', async () => {
    const input = new NewRecipeInput();
    input.title = 'Test Recipe';
    input.description = 'A delicious test recipe that is longer than 30 characters';
    input.ingredients = ['ingredient 1', 'ingredient 2'];
    input.instructions = ['step 1', 'step 2'];
    const errors = await validate(input);    
    expect(errors.length).toBe(0);
  });

  it('should be invalid if title is longer than 30 characters', async () => {
    const input = new NewRecipeInput();
    input.title = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit';
    input.description = 'A delicious test recipe that is longer than 30 characters';
    input.ingredients = ['ingredient 1', 'ingredient 2'];
    input.instructions = ['step 1', 'step 2'];
    const errors = await validate(input);
    expect(errors.length).toBe(1);
    expect(errors[0].constraints).toMatchObject({
      maxLength: 'title must be shorter than or equal to 30 characters',
    });
  });

  it('should be invalid if description is longer than 255 characters', async () => {
    const input = new NewRecipeInput();
    input.title = 'Test Recipe';
    input.description =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mollis nibh in odio pellentesque. sit amet, consectetur adipiscing elit. Sed mollis nibh in odio pellentesque. sit amet, consectetur adipiscing elit. Sed mollis nibh in odio pellentesque. sit amet, consectetur adipiscing elit. Sed mollis nibh in odio pellentesque.';
    input.ingredients = ['ingredient 1', 'ingredient 2'];
    input.instructions = ['step 1', 'step 2'];
    const errors = await validate(input);
    expect(errors.length).toBe(1);
    expect(errors[0].constraints).toMatchObject({
      isLength: 'description must be shorter than or equal to 255 characters',
    });
  });

  it('should be invalid if ingredients is empty', async () => {
    const input = new NewRecipeInput();
    input.title = 'Test Recipe';
    input.description = 'A delicious test recipe that is longer than 30 characters';
    input.ingredients = [];
    input.instructions = ['step 1', 'step 2'];
    const errors = await validate(input);
    expect(errors.length).toBe(1);
    expect(errors[0].constraints).toMatchObject({
      arrayNotEmpty: 'ingredients should not be empty',
    });
  });

  it('should be invalid if instructions is empty', async () => {
    const input = new NewRecipeInput();
    input.title = 'Test Recipe';
    input.description = 'A delicious test recipe that is longer than 30 characters';
    input.ingredients = ['ingredient 1', 'ingredient 2'];
    input.instructions = [];
    const errors = await validate(input);
    expect(errors.length).toBe(1);
    expect(errors[0].constraints).toMatchObject({
      arrayNotEmpty: 'instructions should not be empty',
    });
  });
});
