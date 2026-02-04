import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from '../users/schemas/user.schema';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Session } from './schemas/session.schema';
import { UsersService } from 'src/users/users.service';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';

interface IpApiResponse {
  country_name: string;
  city: string;
  latitude: number;
  longitude: number;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly httpService: HttpService,
    @InjectModel(Session.name) private readonly sessionModel: Model<Session>,
  ) {}

  async signup(signupDto: SignupDto): Promise<{ message: string; user: User }> {
    const user = await this.usersService.create(signupDto);

    if (user instanceof HttpException) {
      throw user;
    }

    return {
      message: 'User created successfully',
      user: {
        email: user.email,
        name: user.name,
        _id: user._id,
      } as User,
    };
  }

  async login(loginDto: LoginDto, ip: string): Promise<string | HttpException> {
    const { email, password } = loginDto;

    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const lookupIp =
      ip === '::1' || ip === '127.0.0.1'
        ? '8.8.8.8' // Test IP (Google)
        : ip;

    await this.sessionModel.create({
      userId: user._id,
      location: await this.getLocation(lookupIp),
      lastSession: new Date(),
    });

    const payload = { sub: user._id };
    return this.jwtService.sign(payload);
  }

  async logout(userId: string): Promise<{ deletedCount?: number }> {
    const session = await this.sessionModel.findOne({
      userId: new Types.ObjectId(userId),
    });

    if (!session) {
      throw new HttpException(
        'No active session found',
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.sessionModel.deleteMany({
      userId: new Types.ObjectId(userId),
    });
  }

  private async getLocation(ip: string) {
    const { data } = await firstValueFrom(
      // Use a free IP geolocation API (ipapi.co)
      this.httpService.get<IpApiResponse>(`https://ipapi.co/${ip}/json/`).pipe(
        catchError(() => {
          throw new HttpException(
            'Failed to fetch IP location',
            HttpStatus.SERVICE_UNAVAILABLE,
          );
        }),
      ),
    );

    return {
      ip,
      country: data?.country_name,
      city: data?.city,
      lat: data?.latitude,
      lng: data?.longitude,
    };
  }
}
