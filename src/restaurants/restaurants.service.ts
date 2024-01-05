import { Injectable } from '@nestjs/common';
import { Restaurant } from './entites/restaurant.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRestaurantDto } from './dtos/create-restaurant.dto';
import { UpdateRestaurantDto } from './dtos/update.restaurant.dto';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectRepository(Restaurant)
    private restaurantsRepository: Repository<Restaurant>,
  ) {}

  getAll() {
    return this.restaurantsRepository.find();
  }

  createRestaurant(restaurantData: CreateRestaurantDto) {
    const newRestaurant = this.restaurantsRepository.create(restaurantData);

    return this.restaurantsRepository.save(newRestaurant);
  }

  updateRestaurant({ id, data }: UpdateRestaurantDto) {
    return this.restaurantsRepository.update(id, data);
  }
}
