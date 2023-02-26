import { Instruction } from './instruction.model';
import { Recipe } from './recipe.model';

describe('Instruction', () => {
    describe('properties', () => {
      it('should have a numeric id property', () => {
        const instruction = new Instruction();
        instruction.id = 1;
        expect(typeof instruction.id).toBe('number');
      });
  
      it('should have a string step property', () => {
        const instruction = new Instruction();
        instruction.step = 1;
        expect(typeof instruction.step).toBe('number');
      });
  
      it('should have a string direction property', () => {
        const instruction = new Instruction();
        instruction.direction = 'direction Type';
        expect(typeof instruction.direction).toBe('string');
      });

  
      it('should have a Recipe property', () => {
        const instruction = new Instruction();
        instruction.recipe = new Recipe(); // or set it to an existing recipe instance
        expect(typeof instruction.recipe).toBe('object');
        expect(instruction.recipe instanceof Recipe).toBe(true);
      });
    });
  });
  
