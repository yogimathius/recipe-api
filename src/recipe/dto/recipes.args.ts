import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class RecipesArgs {
  @Field(() => Int)
  page?: number = 1;

  @Field(() => Int)
  limit?: number = 10;
}
