import { ArgsType, Field } from '@nestjs/graphql';
import { IsBoolean, IsInt, IsString, Length } from 'class-validator';

@ArgsType()
export class CreateRestaurantDto {
  @Field(() => String)
  @IsString()
  @Length(2, 10)
  name: string;

  @Field(() => String)
  @IsString()
  category: string;

  @Field(() => String)
  @IsString()
  address: string;

  @Field(() => Number)
  @IsInt()
  rating: number;

  @Field(() => Boolean)
  @IsBoolean()
  isOpen: number;
}
