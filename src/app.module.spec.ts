import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './app.module';
import { RecipeResolver } from './recipe/recipe.resolver';
import { RecipeModule } from './recipe/recipe.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { DatabaseModule } from './database/database.module';

describe('AppModule', () => {
  let resolver: RecipeResolver;


  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
  });

  
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        RecipeModule,
        GraphQLModule.forRoot({
            driver: ApolloDriver,
            autoSchemaFile: true,
        }),
      ],
    }).compile();

    resolver = moduleRef.get<RecipeResolver>(RecipeResolver);
  });

  it('should include the RecipeResolver in the imports array', () => {
    expect(resolver).toBeDefined();
  });

  it('should include the RecipeModule in the imports array', async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    const recipeModule = moduleRef.get<RecipeModule>(RecipeModule);
    expect(recipeModule).toBeDefined();
  });

  it('should include the GraphQLModule in the imports array', async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    const graphqlModule = moduleRef.get<GraphQLModule>(GraphQLModule);
    expect(graphqlModule).toBeDefined();
  });

  it('should set the autoSchemaFile in the GraphQLModule', () => {
    const graphqlModule = app.get(GraphQLModule.forRoot);
    expect(graphqlModule).toBeDefined();
    expect(graphqlModule.autoSchemaFile).toEqual('schema.gql');
  });
  
  

  it('should include the DatabaseModule in the imports array', async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    const databaseModule = moduleRef.get<DatabaseModule>(DatabaseModule);
    expect(databaseModule).toBeDefined();
  });
});
