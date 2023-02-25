import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { RecipeResolver } from './recipe/recipe.resolver';
import { RecipeModule } from './recipe/recipe.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    RecipeModule,
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: async () => ({
        autoSchemaFile: 'schema.gql',
      }),    
    }),
    DatabaseModule,
  ],})
export class AppModule {}
