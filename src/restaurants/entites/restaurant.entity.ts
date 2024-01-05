import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Restaurant {
  @PrimaryGeneratedColumn()
  @Field(() => Number)
  id: number;

  @Column()
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => String)
  category: string;

  @Column()
  @Field(() => String)
  address: string;

  @Column()
  @Field(() => Number)
  rating: number;

  @Column()
  @Field(() => Boolean)
  isOpen: number;
}
