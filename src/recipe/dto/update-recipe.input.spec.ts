import { validate, ValidationError } from 'class-validator';
import { Ingredient } from '../entities/ingredient.entity';
import { Instruction } from '../entities/instruction.entity';
import { UpdateRecipeInput } from './update-recipe.input';

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

const instruction1 = new Instruction();
instruction1.id = 1;
instruction1.step = 1;
instruction1.direction = 'directon 1';

const instruction2 = new Instruction();
instruction2.id = 2;
instruction2.step = 2;
instruction2.direction = 'directon 2';

describe('UpdateRecipeInput', () => {
  it('should be valid with all fields', async () => {
    const input = new UpdateRecipeInput();
    input.id = 1;
    input.title = 'Test Recipe';
    input.description = 'This is a test recipe with a description longer thatn 50 characters';
    input.ingredients = [ingredient1, ingredient2];
    input.instructions = [instruction1, instruction2]
    
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
      input.ingredients = [ingredient1, ingredient2];
      const errors = await validate(input);
      expect(errors.length).toBe(0);
    });
  });

  describe('instructions', () => {
    it('should not throw an error when instructions are valid', async () => {
      const input = new UpdateRecipeInput();
      input.instructions = [instruction1, instruction2]
      const errors = await validate(input);
      expect(errors.length).toBe(0);
    });
  });
})
