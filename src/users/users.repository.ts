/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { isSameDay } from "date-fns";
import { RegisterUserFairDTO } from "src/dto/registerUserFair.dto";
import { Fair } from "src/entitys/fairs.entity";
import { UsersCapacity } from "src/entitys/userCapacity.entity";
import { UserFairRegistration } from "src/entitys/userFairRegistration.entity";
import { User } from "src/entitys/users.entity";
import { UserStatusGeneral } from "src/enums/statusUsers.enum";
import { Repository } from "typeorm";

@Injectable()
export class UsersRepository {
    constructor(
        @InjectRepository(User) private readonly userDB: Repository<User>,
        @InjectRepository(UserFairRegistration) private readonly userFairRegistrationDB: Repository<UserFairRegistration>,
        @InjectRepository(UsersCapacity) private readonly usersCapacityDB: Repository<UsersCapacity>,
        @InjectRepository(Fair) private readonly fairRepository: Repository<Fair>,
    ) {}

    async getAllUsers() {
        const users = await this.userDB.find();
        if (!users) throw new Error('No se encontraron usuarios');
        return users;
    }

    async registerFair(userId: string, fairId: string, registerUser: RegisterUserFairDTO) {
        const { selectedHour, selectedDay } = registerUser;

    const fair = await this.fairRepository.findOne({
      where: { id: fairId },
      relations: ['fairDays', 'fairDays.buyerCapacities'],
    });
    if (!fair) {
      throw new NotFoundException('Feria no encontrada');
    }

    if(fair.isActive === false){
      throw new BadRequestException('Feria cerrada');
    }

    const user = await this.getUserById(userId);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    if (user.statusGeneral === UserStatusGeneral.BLOCKED) {
      throw new BadRequestException('Usuario bloqueado');
    }

    const fairDay = fair.fairDays.find((day) =>
      isSameDay(day.day, selectedDay),
    );
    if (!fairDay) {
      throw new BadRequestException(
        'No existe un día de feria para la fecha seleccionada',
      );
    }

    const buyerCapacity = fairDay.usersCapacity.find(
      (buyerCap) => buyerCap.hour === selectedHour,
    );
    if (!buyerCapacity) {
      throw new BadRequestException(
        'No existen cupos disponibles en esta hora',
      );
    }

    if (buyerCapacity.capacity <= 0) {
      throw new BadRequestException('No hay cupos disponibles en esta hora');
    }

    buyerCapacity.capacity -= 1;
    await this.usersCapacityDB.save(buyerCapacity);

    const userRegistration = new UserFairRegistration();
    userRegistration.registrationDate = new Date();
    userRegistration.entryFee = fair.entryPriceBuyer;
    userRegistration.registrationDay = selectedDay;
    userRegistration.registrationHour = selectedHour;
    userRegistration.user = user;
    userRegistration.fair = fair;

    await this.userFairRegistrationDB.save(userRegistration);

    user.statusGeneral = UserStatusGeneral.ACTIVE;
    await this.userDB.save(user);

    return 'Usuario registrado en la feria exitosamente, verifique su casilla de correo';
    }

    async getUserById(id: string) {
        const user = await this.userDB.findOne({ where: { id } });
        if (!user) throw new Error('No se encontro el usuario');
        return user;
    }

    async updateUser(id: string, user: Partial<User>) { 
        const userFound = await this.getUserById(id);
    if (!userFound) throw new NotFoundException('El usuario no existe');

    if (userFound.statusGeneral === UserStatusGeneral.BLOCKED) {
      throw new BadRequestException('Usuario bloqueado');
    }

    Object.assign(userFound, user);
    await this.userDB.save(userFound); 
    }
}