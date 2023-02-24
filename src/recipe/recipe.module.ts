import { Module } from '@nestjs/common';
import { RecipeResolver } from './recipe.resolver';
import { RecipesService } from './recipe.service';

@Module({
  providers: [RecipesService, RecipeResolver],
})
export class RecipeModule {}
