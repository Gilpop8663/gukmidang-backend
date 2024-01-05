import { Field, InputType, ObjectType } from '@nestjs/graphql';
import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@InputType({ isAbstract: true })
@Entity()
@ObjectType()
export class Restaurant {
  @PrimaryGeneratedColumn()
  @Field(() => Number)
  id: number;

  @Column()
  @Field(() => String)
  @IsString()
  @Length(2, 10)
  name: string;

  @Column()
  @Field(() => String)
  @IsString()
  category: string;

  @Column()
  @Field(() => String)
  @IsString()
  address: string;

  @Column()
  @Field(() => Number)
  @IsInt()
  rating: number;

  // 데이터베이스
  @Column({ default: true })
  // graphQl
  @Field(() => Boolean, {
    defaultValue: true,
  })
  //dto
  @IsOptional()
  @IsBoolean()
  isOpen: boolean;
}
