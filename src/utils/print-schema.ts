import { printSchema } from 'graphql';
import { writeFileSync } from 'fs';
import { AppModule } from '../app.module';
import { NestFactory } from '@nestjs/core';
import { GraphQLSchemaHost } from '@nestjs/graphql';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const schemaHost = app.get(GraphQLSchemaHost);

  // Generate the updated schema
  const schema = schemaHost.schema;
  const printedSchema = printSchema(schema);

  // Write the schema to the schema.gql file
  writeFileSync('schema.gql', printedSchema);
  console.log('Schema printed to schema.gql file');
  await app.close();
}
bootstrap();
