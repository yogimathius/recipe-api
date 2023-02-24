import { Test, TestingModule } from '@nestjs/testing';
import { RecipeResolver } from './recipe.resolver';
import { RecipesService } from './recipe.service';
import { Recipe } from './models/recipe.model';
import { NewRecipeInput } from './dto/new-recipe.input';
import { UpdateRecipeInput } from './dto/update-recipe.input';
import { RecipesArgs } from './dto/recipes.args';

describe('RecipeResolver', () => {
  let resolver: RecipeResolver;
  let service: RecipesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecipeResolver, RecipesService],
    }).compile();

    resolver = module.get<RecipeResolver>(RecipeResolver);
    service = module.get<RecipesService>(RecipesService);
  });

  describe('recipe', () => {
    it('should return a recipe by id', async () => {
      const expectedRecipe: Recipe = {
        id: '1',
        title: 'New Recipe',
        description: 'A new recipe',
        ingredients: ['ingredient1', 'ingredient2'],
        instructions: ['step1', 'step2'],
      };
      jest.spyOn(service, 'findOneById').mockResolvedValue(expectedRecipe);

      const result = await resolver.recipe('1');

      expect(service.findOneById).toHaveBeenCalledWith('1');
      expect(result).toEqual(expectedRecipe);
    });
  });

  describe('recipes', () => {
    it('should return a list of recipes', async () => {
      const expectedRecipes: Recipe[] = [
        {
          id: '1',
          title: 'New Recipe',
          description: 'A new recipe',
          ingredients: ['ingredient1', 'ingredient2'],
          instructions: ['step1', 'step2'],
        },
        {
          id: '2',
          title: 'New Recipe',
          description: 'A new recipe',
          ingredients: ['ingredient1', 'ingredient2'],
          instructions: ['step1', 'step2'],
        },
        {
          id: '3',
          title: 'New Recipe',
          description: 'A new recipe',
          ingredients: ['ingredient1', 'ingredient2'],
          instructions: ['step1', 'step2'],
        },
      ];
      const recipesArgs: RecipesArgs = { page: 1, limit: 10 };
      jest.spyOn(service, 'findAll').mockResolvedValue(expectedRecipes);

      const result = await resolver.recipes(recipesArgs);

      expect(service.findAll).toHaveBeenCalledWith(recipesArgs);
      expect(result).toEqual(expectedRecipes);
    });
  });

  describe('createRecipe', () => {
    it('should create a new recipe', async () => {
      const newRecipeData: NewRecipeInput = {
        title: 'New Recipe',
        description: 'A new recipe',
        ingredients: ['ingredient1', 'ingredient2'],
        instructions: ['step1', 'step2'],
      };
      const expectedRecipe: Recipe = { id: '1', ...newRecipeData };
      jest.spyOn(service, 'create').mockResolvedValue(expectedRecipe);

      const result = await resolver.createRecipe(newRecipeData);

      expect(service.create).toHaveBeenCalledWith(newRecipeData);
      expect(result).toEqual(expectedRecipe);
    });
  });

  describe('updateRecipe', () => {
    it('should update an existing recipe', async () => {
      const recipeId = 'recipe-id';
      const updateRecipeInput: UpdateRecipeInput = {
        id: recipeId,
        title: 'Updated Recipe',
        description: 'An updated recipe',
        ingredients: ['ingredient1', 'ingredient2'],
        instructions: ['step1', 'step2'],
      };
      const expectedRecipe: Recipe = { id: recipeId, ...updateRecipeInput };
      jest.spyOn(service, 'update').mockResolvedValue(expectedRecipe);

      const result = await resolver.updateRecipe(recipeId, updateRecipeInput);

      expect(service.update).toHaveBeenCalledWith(recipeId, updateRecipeInput);
      expect(result).toEqual(expectedRecipe);
    });
  });

  describe('deleteRecipe', () => {
    it('should delete a recipe', async () => {
      // Create a new recipe to delete
      const newRecipe: NewRecipeInput = {
        title: 'Test Recipe',
        description: 'This is a test recipe',
        ingredients: ['Ingredient 1', 'Ingredient 2'],
        instructions: ['Step 1', 'Step 2'],
      };
      const recipe = await service.create(newRecipe);
  
      // Call the deleteRecipe mutation
      const deleted = await resolver.deleteRecipe(recipe.id);
  
      // Check that the recipe was deleted
      expect(deleted).toBe(true);
      expect(await service.findOneById(recipe.id)).toBeUndefined();
    });
  });
});  
