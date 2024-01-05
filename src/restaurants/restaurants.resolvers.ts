import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Restaurant } from './entites/restaurant.entity';
import { CreateRestaurantDto } from './dtos/create-restaurant.dto';
import { RestaurantsService } from './restaurants.service';

@Resolver(() => Restaurant)
export class RestaurantResolver {
  constructor(private readonly restaurantService: RestaurantsService) {}

  @Query(() => [Restaurant])
  getRestaurantList(@Args('korean') korean: boolean) {
    console.log(korean);

    return this.restaurantService.getAll();
  }

  @Mutation(() => Boolean)
  createRestaurant(@Args() restaurantData: CreateRestaurantDto) {
    console.log(restaurantData);
    return true;
  }
}
