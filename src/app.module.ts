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
      User
    ]),
    AuthModule
  ],
  controllers: [AuthController],
  providers: [AppService, AuthService, AuthRepository],
})

export class AppModule implements NestModule {
  constructor() {}

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
