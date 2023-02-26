import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Recipe } from '../recipe/entities/recipe.entity';
import { Ingredient } from '../recipe/entities/ingredient.entity';

@Module({
  imports: [
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
            entities: [Recipe, Ingredient],
        }),
        inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
