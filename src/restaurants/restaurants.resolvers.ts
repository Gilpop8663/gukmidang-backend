import { Args, Query, Resolver } from '@nestjs/graphql';
import { Restaurant } from './restaurant.entity';

@Resolver(() => Restaurant)
export class RestaurantResolver {
  @Query(() => [Restaurant])
  getRestaurant(@Args('korean') korean: boolean): Restaurant[] {
    console.log(korean);

    return [];
  }
}
