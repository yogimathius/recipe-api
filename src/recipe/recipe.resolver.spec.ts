import { Test, TestingModule } from '@nestjs/testing';
import { RecipeResolver } from './recipe.resolver';
import { RecipesService } from './recipe.service';
import { Recipe } from './models/recipe.model';
import { NewRecipeInput } from './dto/new-recipe.input';
import { UpdateRecipeInput } from './dto/update-recipe.input';
import { RecipesArgs } from './dto/recipes.args';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ingredient } from './entities/ingredient.entity';
import { Instruction } from './entities/instruction.entity';

const mockRepository = () => ({
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  findOneBy: jest.fn(),
});

describe('RecipeResolver', () => {
  let resolver: RecipeResolver;
  let service: RecipesService;
  let repository: Repository<Recipe>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [        
        {
          provide: getRepositoryToken(Recipe),
          useValue: mockRepository(),
        },
        RecipeResolver,
        RecipesService
      ],
    }).compile();

    resolver = module.get<RecipeResolver>(RecipeResolver);
    service = module.get<RecipesService>(RecipesService);
    repository = module.get<Repository<Recipe>>(getRepositoryToken(Recipe));

  });
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

  describe('recipe', () => {
    it('should return a recipe by id', async () => {
      const expectedRecipe: Recipe = {
        id: 1,
        title: 'New Recipe',
        description: 'A new recipe',
        ingredients: [ingredient1, ingredient2],
        instructions: [instruction1, instruction2]
      };
      jest.spyOn(service, 'findOneById').mockResolvedValue(expectedRecipe);

      const result = await resolver.recipe(1);

      expect(service.findOneById).toHaveBeenCalledWith(1);
      expect(result).toEqual(expectedRecipe);
    });
  });

  describe('recipes', () => {
    it('should return a list of recipes', async () => {
      const expectedRecipes: Recipe[] = [
        {
          id: 1,
          title: 'New Recipe',
          description: 'A new recipe',
          ingredients: [ingredient1, ingredient2],
          instructions: [instruction1, instruction2]
        },
        {
          id: 2,
          title: 'New Recipe',
          description: 'A new recipe',
          ingredients: [ingredient1, ingredient2],
          instructions: [instruction1, instruction2]
        },
        {
          id: 3,
          title: 'New Recipe',
          description: 'A new recipe',
          ingredients: [ingredient1, ingredient2],
          instructions: [instruction1, instruction2]
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
        ingredients: [ingredient1, ingredient2],
        instructions: [instruction1, instruction2]
      };
      const expectedRecipe: Recipe = { id: 1, ...newRecipeData };
      jest.spyOn(service, 'create').mockResolvedValue(expectedRecipe);

      const result = await resolver.createRecipe(newRecipeData);

      expect(service.create).toHaveBeenCalledWith(newRecipeData);
      expect(result).toEqual(expectedRecipe);
    });
  });

  describe('updateRecipe', () => {
    it('should update an existing recipe', async () => {
      const recipeId = 1;
      const updateRecipeInput: UpdateRecipeInput = {
        id: recipeId,
        title: 'Updated Recipe',
        description: 'An updated recipe',
        ingredients: [ingredient1, ingredient2],
        instructions: [instruction1, instruction2]
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
        ingredients: [ingredient1, ingredient2],
        instructions: [instruction1, instruction2]
      };
      jest.spyOn(repository, 'save').mockResolvedValue({id: 1, ...newRecipe});

      const recipe = await service.create(newRecipe);
      jest.spyOn(repository, 'findOneBy').mockResolvedValueOnce(recipe);

      const mockDeleteResult = { affected: 1, raw: null };
      jest.spyOn(repository, 'delete').mockResolvedValue(mockDeleteResult);
      // Call the deleteRecipe mutation
      const deleted = await resolver.deleteRecipe(recipe.id);
  
      // Check that the recipe was deleted
      expect(deleted).toBe(true);
      expect(await service.findOneById(recipe.id)).toBeUndefined();
    });
  });
});  
