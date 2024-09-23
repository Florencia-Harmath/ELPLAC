/* eslint-disable prettier/prettier */
//configuracion
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeorm from './config/typeorm';
import { JwtModule } from '@nestjs/jwt';
//providers
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthRepository } from './auth/auth.repository';
import { LoggerMiddleware } from './middlewares/Logger.middleware';
//modulos
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
//entitys
import { Category } from './entitys/category.entity';
import { FairCategory } from './entitys/fairCategory.entity';
import { FairDay } from './entitys/fairDays.entity';
import { Fair } from './entitys/fairs.entity';
import { PaymentTransaction } from './entitys/payment.entity';
import { Product } from './entitys/products.entity';
import { ProductRequest } from './entitys/productsRequest.entity';
import { SellerFairRegistration } from './entitys/sellerFairRegistration.entity';
import { User } from './entitys/users.entity';
import { Seller } from './entitys/sellers.entity';
import { UsersCapacity } from './entitys/userCapacity.entity';
import { UserFairRegistration } from './entitys/userFairRegistration.entity';
import { CategoriesRepository } from './categories/categories.repository';
import { CategoriesService } from './categories/categories.service';
import { CategoriesController } from './categories/categories.controller';
import { FairsModule } from './fairs/fairs.module';
import { FairsController } from './fairs/fairs.controller';
import { FairsRepository } from './fairs/fairs.repository';
import { FairsService } from './fairs/fairs.service';
import { SellersModule } from './sellers/sellers.module';
import { SellersController } from './sellers/sellers.controller';
import { SellersRepository } from './sellers/sellers.repository';
import { SellersService } from './sellers/sellers.service';
import { UsersModule } from './users/users.module';
import { UsersRepository } from './users/users.repository';
import { UsersService } from './users/users.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configservice: ConfigService) =>
        configservice.get('typeorm'),
    }),
    JwtModule.register({
      secret: process.env.JWTSECRET,
      signOptions: { expiresIn: '12h' },
      global: true,
    }),
    //entidades
    TypeOrmModule.forFeature([
      Category,
      FairCategory,
      FairDay,
      Fair,
      PaymentTransaction,
      Product,
      ProductRequest,
      SellerFairRegistration,
      Seller,
      UsersCapacity,
      UserFairRegistration,
      User,
    ]),
    //modulos
    AuthModule,
    CategoriesModule,
    FairsModule,
    SellersModule,
    UsersModule
  ],
  controllers: [AuthController, CategoriesController, FairsController, SellersController],
  providers: [
    AppService,
    AuthService,
    AuthRepository,
    CategoriesRepository,
    CategoriesService,
    FairsRepository,
    FairsService,
    SellersRepository,
    SellersService,
    UsersRepository,
    UsersService
  ],
})
export class AppModule implements NestModule {
  constructor() {}

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
