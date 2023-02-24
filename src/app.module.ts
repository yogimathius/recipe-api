import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { RecipeResolver } from './recipe/recipe.resolver';
import { RecipeModule } from './recipe/recipe.module';

@Module({
  controllers: [],
  providers: [RecipeResolver],
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
    }),
    // RecipeModule,
  ],})
export class AppModule {}
