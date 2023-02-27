import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Recipe } from '../recipe/entities/recipe.entity';
import { Ingredient } from '../recipe/entities/ingredient.entity';
import { Instruction } from '../recipe/entities/instruction.entity';
import { RecipeRepository } from '../recipe/repositories/recipe.repository';
import { RecipesService } from '../recipe/recipe.service';
import { IngredientRepository } from '../recipe/repositories/ingredient.repository';
import { InstructionRepository } from '../recipe/repositories/instruction.repository';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: +process.env.DB_PORT || 5432,
      username: process.env.DB_USERNAME || 'yogimathius',
      password: process.env.DB_PASSWORD || 'password',
      database: process.env.DB_NAME || 'recipe_api',
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Recipe, Ingredient, Instruction]),
  ],
  providers: [
    RecipeRepository,
    RecipesService,
    IngredientRepository,
    InstructionRepository,
  ],
})
export class RootTestModule {}
