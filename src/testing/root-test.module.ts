import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
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
    TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'yogimathius',
          password: 'password',
          database: 'recipe_api',
          autoLoadEntities: true,
          synchronize: true,
        }),
        inject: [ConfigService],
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
