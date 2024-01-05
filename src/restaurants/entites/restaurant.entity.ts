import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Restaurant {
  @Field(() => String)
  name: string;

  @Field(() => String)
  category: string;

  @Field(() => String)
  address: string;

  @Field(() => Number)
  rating: number;

  @Field(() => Boolean)
  isOpen: number;
}
