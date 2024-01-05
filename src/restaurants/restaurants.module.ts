import { Module } from '@nestjs/common';
import { RestaurantResolver } from './restaurants.resolvers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from './entites/restaurant.entity';
import { RestaurantsService } from './restaurants.service';

@Module({
  imports: [TypeOrmModule.forFeature([Restaurant])],
  providers: [RestaurantResolver, RestaurantsService],
})
export class RestaurantsModule {}
