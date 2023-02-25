import { validate, ValidationError } from 'class-validator';
import { UpdateRecipeInput } from './update-recipe.input';

describe('UpdateRecipeInput', () => {
  it('should be valid with all fields', async () => {
    const input = new UpdateRecipeInput();
    input.id = 1;
    input.title = 'Test Recipe';
    input.description = 'This is a test recipe with a description longer thatn 50 characters';
    input.ingredients = ['Ingredient 1', 'Ingredient 2'];
    input.instructions = ['Step 1', 'Step 2'];
    
    const errors = await validate(input);
    expect(errors.length).toBe(0);
  });

  it('should be valid with no optional fields', async () => {
    const input = new UpdateRecipeInput();
    input.id = 1;

    const errors = await validate(input);
    expect(errors.length).toBe(0);
  });

  it('should not be valid with invalid title length', async () => {
    const input = new UpdateRecipeInput();
    input.id = 1;
    input.title = 'This title is too long and should not be valid';

    const errors = await validate(input);
    expect(errors.length).toBeGreaterThan(0);
  });
    it('should not throw an error when title is valid', async () => {
      const input = new UpdateRecipeInput();
      input.title = 'Valid Title';
      const errors = await validate(input);
      expect(errors.length).toBe(0);
    });

    it('should throw an error when title is too long', async () => {
      const input = new UpdateRecipeInput();
      input.title = 'This title is too long and should throw an error';
      const errors = await validate(input);
      expect(errors.length).toBe(1);
      expect(errors[0]).toBeInstanceOf(ValidationError);
    });
  });

  describe('description', () => {
    it('should not throw an error when description is valid', async () => {
      const input = new UpdateRecipeInput();
      input.description = 'This is a test recipe with a description longer thatn 50 characters';
      const errors = await validate(input);
      expect(errors.length).toBe(0);
    });

    it('should throw an error when description is too short', async () => {
      const input = new UpdateRecipeInput();
      input.description = 'Short';
      const errors = await validate(input);
      expect(errors.length).toBe(1);
      expect(errors[0]).toBeInstanceOf(ValidationError);
    });

    it('should throw an error when description is too long', async () => {
      const input = new UpdateRecipeInput();
      input.description = 'This description is too long and should throw an error. '.repeat(20);
      const errors = await validate(input);
      expect(errors.length).toBe(1);
      expect(errors[0]).toBeInstanceOf(ValidationError);
    });
  describe('ingredients', () => {
    it('should not throw an error when ingredients are valid', async () => {
      const input = new UpdateRecipeInput();
      input.ingredients = ['Ingredient 1', 'Ingredient 2'];
      const errors = await validate(input);
      expect(errors.length).toBe(0);
    });
  });

  describe('instructions', () => {
    it('should not throw an error when instructions are valid', async () => {
      const input = new UpdateRecipeInput();
      input.instructions = ['Step 1', 'Step 2'];
      const errors = await validate(input);
      expect(errors.length).toBe(0);
    });
  });
})