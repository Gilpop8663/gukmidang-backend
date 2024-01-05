import { Injectable } from '@nestjs/common';
import { Restaurant } from './entites/restaurant.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectRepository(Restaurant)
    private restaurantsRepository: Repository<Restaurant>,
  ) {}

  getAll() {
    return this.restaurantsRepository.find();
  }
}
