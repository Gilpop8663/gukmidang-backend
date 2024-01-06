import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { Restaurant } from './restaurants/entites/restaurant.entity';
import { UsersModule } from './users/users.module';
import { CommonModule } from './common/common.module';
import { User } from './users/entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: process.env.NODE_ENV === 'prod',
      envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env',
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('dev', 'prod', 'test').default('dev'),
        DB_PORT: Joi.number().default(5432),
        DB_USERNAME: Joi.string(),
        DB_DATABASE_NAME: Joi.string(),
        DB_PASSWORD: Joi.string(),
      }),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '192.168.144.1',
      port: +process.env.DB_PORT,
      username: 'postgres',
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE_NAME,
      entities: [Restaurant, User],
      logging: true,
      synchronize: process.env.NODE_ENV !== 'prod',
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
    RestaurantsModule,
    UsersModule,
    CommonModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
