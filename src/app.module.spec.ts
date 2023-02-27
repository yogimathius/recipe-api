import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './app.module';
import { RecipeResolver } from './recipe/recipe.resolver';
import { RecipeModule } from './recipe/recipe.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { DatabaseModule } from './database/database.module';
import { RootTestModule } from './testing/root-test.module';

describe('AppModule', () => {
  let resolver: RecipeResolver;
  let moduleRef: TestingModule;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [
        GraphQLModule.forRootAsync<ApolloDriverConfig>({
          driver: ApolloDriver,
          useFactory: async () => ({
            autoSchemaFile: 'schema.gql',
          }),    
        }),
        RootTestModule,
        RecipeModule,
        DatabaseModule,
      ]
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
    const graphqlModule = moduleRef.get(GraphQLModule.forRootAsync);
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
