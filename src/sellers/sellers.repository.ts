/* eslint-disable prettier/prettier */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FairCategory } from 'src/entitys/fairCategory.entity';
import { Fair } from 'src/entitys/fairs.entity';
import { SellerFairRegistration } from 'src/entitys/sellerFairRegistration.entity';
import { Seller } from 'src/entitys/sellers.entity';
import { UserStatusGeneral } from 'src/enums/statusUsers.enum';
import { Repository } from 'typeorm';

@Injectable()
export class SellersRepository {
  constructor(
    @InjectRepository(Seller) private readonly sellerDB: Repository<Seller>,
    @InjectRepository(Fair) private readonly fairRepositoryDB: Repository<Fair>,
    @InjectRepository(FairCategory)
    private readonly fairCategoryRepository: Repository<FairCategory>,
    @InjectRepository(SellerFairRegistration)
    private readonly sellerFairRegistrationRepository: Repository<SellerFairRegistration>,
  ) {}

  async getAllSellers() {
    const sellers = await this.sellerDB.find({
        relations: {
          products: true,
          registrations: {
            fair: true,
            categoryFair: {
              category: true,
            },
          },
        },
      });
    if (!sellers) throw new Error('No existen vendedores');
    return sellers;
  }

  async registerFair(
    sellerId: string,
    fairId: string,
    fairCategoryId: string,
    liquidation: any,
  ) {
    try {
      console.log(
        `registerFair called with sellerId: ${sellerId}, fairId: ${fairId}, fairCategoryId: ${fairCategoryId}, liquidation: ${liquidation}`,
      );

      const fair = await this.fairRepositoryDB.findOneBy({ id: fairId });
      if (!fair) {
        throw new NotFoundException('Feria no encontrada');
      }
      if (fair.isActive === false) {
        throw new BadRequestException('Feria cerrada');
      }

      const seller = await this.sellerDB.findOne({
        where: { id: sellerId },
        relations: ['user'],
      });
      if (!seller) {
        throw new NotFoundException('Vendedor no encontrado');
      }

      const fairCategory = await this.fairCategoryRepository.findOne({
        where: { id: fairCategoryId },
        relations: ['category'],
      });
      if (!fairCategory) {
        throw new NotFoundException('Categoría no encontrada');
      }

      if (!fairCategory.category || !fairCategory.category.name) {
        throw new BadRequestException('La categoría no tiene nombre');
      }

      if (fairCategory.maxSellers <= 0) {
        throw new BadRequestException('Categoría llena');
      }
      let newLiquidation = false;
      if (liquidation == 'Si') {
        newLiquidation = true;
      }

      // Asignar fairCategory a sellerRegistration.categoryFair
      const sellerRegistration = new SellerFairRegistration();
      console.log(liquidation);
      sellerRegistration.registrationDate = new Date();
      sellerRegistration.entryFee = fair.entryPriceSeller;
      sellerRegistration.liquidation = newLiquidation;
      sellerRegistration.seller = seller;
      sellerRegistration.fair = fair;
      sellerRegistration.categoryFair = fairCategory; // Asignación de fairCategory a categoryFair

      await this.sellerFairRegistrationRepository.save(sellerRegistration);

      console.log(
        `Vendedor registrado correctamente en la feria:`,
        sellerRegistration,
      );
      seller.statusGeneral = UserStatusGeneral.ACTIVE;
      await this.sellerDB.save(seller);

      return 'Vendedor registrado correctamente';
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      console.log(error);
      throw new Error('Error al registrar vendedor en la feria');
    }
  }

  async getSellerById(id: string) {
    const seller = await this.sellerDB.findOne({
      where: { id: id },
      relations: {
        products: true,
        registrations: {
          fair: true,
          categoryFair: {
            category: true,
          },
        },
      },
    });
    if (!seller) throw new Error('Vendedor no encontrado');
    return seller;
  }

  async updateSeller(id: string, seller: Partial<Seller>) {
    const sellerToUpdate = await this.sellerDB.findOneBy({ id });
    if (!sellerToUpdate) throw new NotFoundException('Vendedor no encontrado');
    Object.assign(sellerToUpdate, seller);
    return await this.sellerDB.save(sellerToUpdate);
}
}
