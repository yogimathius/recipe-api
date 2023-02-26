import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Recipe } from '../recipe/entities/recipe.entity';
import { Ingredient } from '../recipe/entities/ingredient.entity';
import { Instruction } from '../recipe/entities/instruction.entity';
import { RecipeRepository } from '../recipe/repositories/recipe.repository';
import { IngredientRepository } from '../recipe/repositories/ingredient.repository';
import { InstructionRepository } from '../recipe/repositories/instruction.repository';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
        imports:[ConfigModule],
        useFactory: async (configService: ConfigService) => ({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'yogimathius', // set the username here
            password: 'password',
            database: 'recipe_api',
            autoLoadEntities: true,
            synchronize: true,
            entities: [Recipe, Ingredient, Instruction],
        }),
        inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([RecipeRepository, IngredientRepository, InstructionRepository]),
  ],
})
export class DatabaseModule {}
