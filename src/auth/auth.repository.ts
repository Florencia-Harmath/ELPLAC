/* eslint-disable prettier/prettier */
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginUserDTO } from 'src/dto/loginUser.dto';
import { RegisterUserDTO } from 'src/dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entitys/users.entity';
import { Seller } from 'src/entitys/sellers.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserStatusGeneral } from 'src/enums/statusUsers.enum';

@Injectable()
export class AuthRepository {
  constructor(
    @InjectRepository(User) private readonly userDB: Repository<User>,
    @InjectRepository(Seller) private readonly sellerDB: Repository<Seller>,
    private readonly jwtService: JwtService,
  ) {}

  async RegisterUser(user: RegisterUserDTO) {
    const userFound = await this.userDB.findOne({ where: { email: user.email } });
    if (userFound) throw new BadRequestException('El usuario ya existe');

    if (user.password !== user.confirmPassword) {
      throw new BadRequestException('Las contraseñas no coinciden');
    }

    const hashedPassword = await bcrypt.hash(user.password, 12);
    if (!hashedPassword) {
      throw new BadRequestException('Error al encriptar la contraseña');
    }

    const newUser = { ...user, password: hashedPassword };

    await this.userDB.save(newUser);

    return newUser;
  }

  async RegisterSeller(seller: RegisterUserDTO) {
    const sellerFound = await this.sellerDB.findOne({ where: { email: seller.email } });
    if (sellerFound) throw new BadRequestException('El usuario ya existe');

    if (seller.password !== seller.confirmPassword) {
      throw new BadRequestException('Las contraseñas no coinciden');
    }

    const hashedPassword = await bcrypt.hash(seller.password, 12);
    if (!hashedPassword) {
      throw new BadRequestException('Error al encriptar la contraseña');
    }

    const newSeller = { ...seller, password: hashedPassword };

    await this.sellerDB.save(newSeller);

    return newSeller;
  }

  async Login(login: LoginUserDTO) {
    const userFound = await this.userDB.findOne({
      where: { email: login.email },
    });
    const sellerFound = await this.sellerDB.findOne({
      where: { email: login.email },
    });

    const foundUser = userFound || sellerFound;
    if (!foundUser) {
      throw new BadRequestException('Credenciales incorrectas');
    }

    const isPasswordValid = await bcrypt.compare(
      login.password,
      foundUser.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    if (foundUser.statusGeneral === UserStatusGeneral.BLOCKED) {
      throw new UnauthorizedException('Cuenta bloqueada');
    }

    const payload = {
      id: foundUser.id,
      email: foundUser.email,
      role: foundUser.role,
    };

    const expiresIn = login.rememberMe ? '7d' : '12h';

    const token = this.jwtService.sign(payload, { expiresIn });

    return { token, role: foundUser.role };
  }
}
