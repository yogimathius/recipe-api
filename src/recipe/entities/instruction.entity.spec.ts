import { Instruction } from './instruction.entity';
import { Recipe } from './recipe.entity';

describe('Instruction entity', () => {
  it('should have a numeric id property', () => {
    const instruction = new Instruction();
    expect(typeof instruction.id).toBe('number');
  });

  it('should have a string step property', () => {
    const instruction = new Instruction();
    instruction.step = 1;
    expect(typeof instruction.step).toBe('number');
  });
  
  it('should have a string direction property', () => {
    const instruction = new Instruction();
    instruction.direction = 'direction 1';
    expect(typeof instruction.direction).toBe('string');
  });

  it('should have a recipe property', () => {
    const recipe = new Recipe();
    const instruction = new Instruction();
    instruction.recipe = recipe;
    expect(instruction.recipe).toBeDefined();
  });
});
