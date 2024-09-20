/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FairDTO } from "src/dto/fair.dto";
import { Category } from "src/entitys/category.entity";
import { FairCategory } from "src/entitys/fairCategory.entity";
import { FairDay } from "src/entitys/fairDays.entity";
import { Fair } from "src/entitys/fairs.entity";
import { UsersCapacity } from "src/entitys/userCapacity.entity";
import { Repository } from "typeorm";
import { addMinutes, parseISO } from 'date-fns';
import { UserStatusGeneral } from "src/enums/statusUsers.enum";

@Injectable()
export class FairsRepository {
    constructor(
        @InjectRepository(Fair) private readonly fairDB: Repository<Fair>,
        @InjectRepository(FairCategory) private readonly fairCategoryDB: Repository<FairCategory>,
        @InjectRepository(Category) private readonly categoryDB: Repository<Category>,
        @InjectRepository(FairDay) private readonly fairDayDB: Repository<FairDay>,
        @InjectRepository(UsersCapacity) private readonly usersCapacityDB: Repository<UsersCapacity>,
    ) {}

    async getAllFairs() {
        const fairs = await this.fairDB.find({
            relations: [
              'fairDays',
              'fairDays.usersCapacity',
              'userRegistrations',
              'sellerRegistrations',
              'sellerRegistrations.categoryFair.category',
              'sellerRegistrations.seller',
              'fairCategories',
              'fairCategories.category',
              'fairCategories.products',
              'sellerRegistrations.seller.user',
            ],
          }

        );
        if (!fairs) throw new Error('No se encontraron fairs');
        return fairs
    }

    async createFairs(fairDto: FairDTO) {
        const fair = new Fair();
        fair.name = fairDto.name;
        fair.address = fairDto.address;
        fair.entryPriceSeller = fairDto.entryPriceSeller;
        fair.entryPriceBuyer = fairDto.entryPriceBuyer;
        fair.entryDescription = fairDto.entryDescription;
      
        const savedFair = await this.fairDB.save(fair);
      
        if (fairDto.fairCategories) {
          const fairCategories = await Promise.all(
            fairDto.fairCategories.map(async (fairCategoryDto) => {
              const fairCategory = new FairCategory();
              fairCategory.maxProductsSeller = fairCategoryDto.maxProductsSeller;
              fairCategory.minProductsSeller = fairCategoryDto.minProductsSeller;
              fairCategory.maxSellers = fairCategoryDto.maxSellers;
              fairCategory.maxProducts = fairCategoryDto.maxProducts;
              fairCategory.fair = savedFair;
              fairCategory.products = [];
      
              if (fairCategoryDto.category && Array.isArray(fairCategoryDto.category) && fairCategoryDto.category.length > 0) {
                const categoryEntities = await Promise.all(
                  fairCategoryDto.category.map(async (categoryDto) => {
                    const category = await this.categoryDB.findOneBy({ name: categoryDto.name });
                    if (!category) {
                      throw new NotFoundException(`La categoría ${categoryDto.name} no existe`);
                    }
                    return category;
                  })
                );
                fairCategory.category = categoryEntities[0];
              } else {
                throw new BadRequestException('La categoría no tiene nombre o no está definida correctamente');
              }
      
              return this.fairCategoryDB.save(fairCategory);
            })
          );
          savedFair.fairCategories = fairCategories;
        }
      
        const startDate = new Date(fairDto.startDate);
        const endDate = new Date(fairDto.endDate);
        const startTime = parseISO(`1970-01-01T${fairDto.startTime}:00Z`);
        const endTime = parseISO(`1970-01-01T${fairDto.endTime}:00Z`);
        const interval = fairDto.timeSlotInterval;
      
        const fairDays = [];
        for (let day = startDate; day <= endDate; day.setDate(day.getDate() + 1)) {
          const fairDay = new FairDay();
          fairDay.day = new Date(day);
          fairDay.fair = savedFair;
      
          const savedFairDay = await this.fairDayDB.save(fairDay);
      
          const buyerCapacities = [];
          for (let time = startTime; time < endTime; time = addMinutes(time, interval)) {
            const buyerCapacity = new UsersCapacity();
            buyerCapacity.hour = time.toISOString().substr(11, 5); 
            buyerCapacity.capacity = fairDto.capacityPerTimeSlot;
            buyerCapacity.fairDay = savedFairDay;
            buyerCapacities.push(await this.usersCapacityDB.save(buyerCapacity));
          }
          savedFairDay.usersCapacity = buyerCapacities;
          fairDays.push(savedFairDay);
        }
      
        savedFair.fairDays = fairDays;
        return savedFair;
    }

    async getFairsById(id: string) {
        const fair = await this.fairDB.findOne({
            where: { id: id },
            relations: [
              'fairDays',
              'fairDays.usersCapacity',
              'userRegistrations',
              'sellerRegistrations',
              'sellerRegistrations.categoryFair.category',
              'sellerRegistrations.seller',
              'fairCategories',
              'fairCategories.products',
              'fairCategories.category',
              'sellerRegistrations.seller.user',
              'productRequests'
            ],
          });
          if (!fair) throw new NotFoundException('Feria no encontrada');
          return fair;
    }

    async updateFairs(fairId: string, fair: Partial<FairDTO>) {
        const fairToUpdate = await this.fairDB.findOneBy({ id: fairId });
    if (!fairToUpdate) throw new NotFoundException('Feria no encontrada');

    Object.assign(fairToUpdate, fair);
    await this.fairDB.save(fairToUpdate);
    return { message: 'Feria actualizada correctamente', fairToUpdate };
    }

    async deleteFairs(id: string) {
        const fairToDelete = await this.fairDB.findOneBy({ id: id });
    if (!fairToDelete) throw new NotFoundException('Feria no encontrada');
    await this.fairDB.remove(fairToDelete);
    return { message: 'Feria eliminada correctamente', fairToDelete };
    }

    async closeFairs(fairId: string) {
        const fairToClose = await this.fairDB.findOne({where: { id: fairId }, relations: { userRegistrations: { user: true }, sellerRegistrations: { seller: true } } });
    if (!fairToClose) throw new NotFoundException('Feria no encontrada');

    const user = fairToClose.userRegistrations;
    user.map((user) => {
      user.user.statusGeneral = UserStatusGeneral.INACTIVE;
    })

    const seller = fairToClose.sellerRegistrations;
    seller.map((seller) => {
      seller.seller.statusGeneral = UserStatusGeneral.INACTIVE;
    })

    fairToClose.isActive = false;
    return await this.fairDB.save(fairToClose);
    }
}