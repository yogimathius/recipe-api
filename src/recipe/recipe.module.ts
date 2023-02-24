import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipeResolver } from './recipe.resolver';
import { RecipesService } from './recipe.service';
import { Recipe } from './entities/recipe.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Recipe])],
    providers: [RecipesService, RecipeResolver],
})
export class RecipeModule {}
