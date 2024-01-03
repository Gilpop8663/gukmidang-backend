import { Query, Resolver } from '@nestjs/graphql';
import { Restaurant } from './restaurant.entity';

@Resolver()
export class RestaurantResolver {
  @Query(() => Restaurant)
  getRestaurant() {
    return true;
  }
}
