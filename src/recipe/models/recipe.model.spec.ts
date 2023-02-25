import { Recipe } from './recipe.model';

describe('Recipe', () => {
  describe('title', () => {
    it('should convert title to uppercase with @upper directive', () => {
      const recipe = new Recipe();
      recipe.title = 'test title';
      expect(recipe.title).toEqual('test title');
    });
  });

  describe('ingredients', () => {
    it('should have an empty array as default value', () => {
      const recipe = new Recipe();
      expect(recipe.ingredients).toEqual([]);
    });
  });

  describe('instructions', () => {
    it('should have an empty array as default value', () => {
      const recipe = new Recipe();
      expect(recipe.instructions).toEqual([]);
    });
  });
});
