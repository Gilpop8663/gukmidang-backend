import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class CreateRestaurantDto {
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
