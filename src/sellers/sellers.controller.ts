/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { SellersService } from './sellers.service';
import { Roles } from 'src/guards/roles.decorator';
import { Role } from 'src/guards/roles.enum';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { Seller } from 'src/entitys/sellers.entity';

@Controller('sellers')
export class SellersController {
  constructor(private readonly sellersService: SellersService) {}

  //obtener todos los vendedores
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RoleGuard)
  @Get()
  async getAllSellers() {
    return await this.sellersService.getAllSellers();
  }

  //registro de vendedor a una feria
  @UseGuards(AuthGuard)
  @Post('registerFair/:sellerId/:fairId/:fairCategoryId')
  async registerFair(
    @Param('sellerId') sellerId: string,
    @Param('fairId') fairId: string,
    @Param('fairCategoryId') fairCategoryId: string,
    @Body() liquidation: any,
  ) {
    return await this.sellersService.registerFair(
      sellerId,
      fairId,
      fairCategoryId,
      liquidation.liquidation,
    )
  }

  //obtener un vendedor por id
  @UseGuards(AuthGuard)
  @Get(':id')
  async getSellerById(@Param('id') id: string) {
    return await this.sellersService.getSellerById(id);
  }

  //editar un vendedor
  @UseGuards(AuthGuard)
  @Put(":id")
  async updateSeller(@Param('id') id: string, @Body() seller: Partial<Seller>) {
    return await this.sellersService.updateSeller(id, seller);
  }
}
