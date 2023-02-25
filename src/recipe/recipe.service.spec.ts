import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RecipesService } from './recipe.service';
import { Recipe } from './models/recipe.model';

const mockRepository = () => ({
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  findOneBy: jest.fn(),
});

describe('RecipesService', () => {
  let service: RecipesService;
  let repository: Repository<Recipe>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(Recipe),
          useValue: mockRepository(),
        },
        RecipesService,
      ],
    }).compile();

    service = module.get<RecipesService>(RecipesService);
    repository = module.get<Repository<Recipe>>(getRepositoryToken(Recipe));
  });

  describe('create', () => {
    it('should create and save a new recipe', async () => {
      const newRecipe = { title: 'Recipe 1', description: 'Description 1', instructions: ['step 1'], ingredients: ['food 1'] };
      const expectedRecipe = { id: 1, ...newRecipe };
       jest.spyOn(repository, 'save').mockResolvedValue(expectedRecipe);

      const result = await service.create(newRecipe);

      expect(repository.save).toHaveBeenCalledWith(newRecipe);
      expect(result).toEqual(expectedRecipe);
    });
  });

  describe('findOneById', () => {
    it('should find a recipe by id', async () => {
        const expectedRecipe = { id: 1, title: 'Recipe 1', description: 'Description 1', instructions: ['step 1'], ingredients: ['food 1'] };
        jest.spyOn(repository, 'findOneBy').mockResolvedValue(expectedRecipe);

      const result = await service.findOneById(1);

      expect(repository.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(result).toEqual(expectedRecipe);
    });
  });

  describe('findAll', () => {
    it('should find all recipes with pagination', async () => {
      const recipes = [
        { id: 1, title: 'Recipe 1', description: 'Description 1', instructions: ['step 1'], ingredients: ['food 1'] },
        { id: 2, title: 'Recipe 2', description: 'Description 2', instructions: ['step 1'], ingredients: ['food 1'] },
        { id: 3, title: 'Recipe 3', description: 'Description 3', instructions: ['step 1'], ingredients: ['food 1'] },
      ];
      jest.spyOn(repository, 'find').mockResolvedValue(recipes);

      const result = await service.findAll({ page: 1, limit: 10 });

      expect(repository.find).toHaveBeenCalledWith({
        take: 10,
        skip: 0,
      });
      expect(result).toEqual(recipes);
    });
  });

  describe('update', () => {
    it('should update a recipe by id', async () => {
      const updatedRecipe = { title: 'Updated Recipe', description: 'Updated Description', instructions: ['step 1'], ingredients: ['food 1'] };
      const expectedRecipe = { id: 1, ...updatedRecipe };
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(expectedRecipe);
      jest.spyOn(repository, 'update').mockResolvedValue({ affected: 1, generatedMaps: [updatedRecipe], raw: null });

      const result = await service.update(1, updatedRecipe);

      expect(repository.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(repository.update).toHaveBeenCalledWith(1, updatedRecipe);
      expect(result).toEqual(expectedRecipe);
    });
  });

  describe('remove', () => {
    it('should delete a recipe', async () => {
      const mockRecipe = { id: 1, title: 'Recipe 1', description: 'test', instructions: ['step 1'], ingredients: ['food 1'] };
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(mockRecipe);

      const mockDeleteResult = { affected: 1, raw: null };
      jest.spyOn(repository, 'delete').mockResolvedValue(mockDeleteResult);
  
      const result = await service.remove(1);
      expect(result).toEqual(true);
      expect(repository.delete).toHaveBeenCalledWith(1);
    });
  
    it('should return false if recipe is not found', async () => {
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(null);
  
      const result = await service.remove(1);
      expect(result).toEqual(false);
      expect(repository.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(repository.delete).not.toHaveBeenCalled();
    });
  });
  
})  
