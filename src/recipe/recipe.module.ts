import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { RecipeResolver } from './recipe.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
  ],
  providers: [RecipeResolver],
})
export class RecipeModule {}
