import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Restaurant } from './restaurant.entity';
import { CreateRestaurantDto } from './dtos/create-restaurant.dto';

@Resolver(() => Restaurant)
export class RestaurantResolver {
  @Query(() => [Restaurant])
  getRestaurantList(@Args('korean') korean: boolean): Restaurant[] {
    console.log(korean);

    return [];
  }

  @Mutation(() => Boolean)
  createRestaurant(@Args() restaurantData: CreateRestaurantDto) {
    console.log(restaurantData);
    return true;
  }
}
