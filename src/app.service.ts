/* eslint-disable prettier/prettier */
import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class AppService implements OnModuleInit {
  async onModuleInit() {
      const admin = {
        name: 'admincito',
      lastname: 'admin',
      dni: '1111111111',
      address: 'admin',
      phone: '1111111111',
      email: 'admin@email.com',
      password: 'Admin!123456',
      confirmPassword: 'Admin!123456',
      registration_date: new Date(),
      role: 'admin',
      status: true,
      isVerified: true,
      }

      return admin;
  }
}


//GUARDAR EL ADMIN EN LA BASE DE DATOS