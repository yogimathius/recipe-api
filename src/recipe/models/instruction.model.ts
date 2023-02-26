import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Recipe } from './recipe.model';

@Entity()
@ObjectType()
export class Instruction {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column()
  @Field()
  step: number;

  @Column()
  @Field()
  direction: string;

  @ManyToOne(() => Recipe, (recipe) => recipe.instructions)
  recipe: Recipe;
}
