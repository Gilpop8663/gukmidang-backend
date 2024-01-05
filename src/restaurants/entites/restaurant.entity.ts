import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsInt, IsString, Length } from 'class-validator';
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

  @Column()
  @Field(() => Boolean)
  @IsBoolean()
  isOpen: number;
}
