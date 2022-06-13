import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  BadRequestException,
  Res,
  Req,
  UnauthorizedException,
  Header,
  Headers,
  HttpException,
} from '@nestjs/common';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';
import { CreateUserDTO } from './user.dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  @Post('register')
  async registerUser(@Body() usr: CreateUserDTO) {
    const { name, username, password } = usr;
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = this.userService.register(username, hashedPassword, name);
    return { message: 'Register success', data: user };
  }

  @Post('login')
  async loginUser(
    @Body('username') usrUsername: string,
    @Body('password') usrPassword: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = await this.userService.findOne({ username: usrUsername });
    if (!user) {
      throw new BadRequestException('invalid credentials');
    }

    if (!(await bcrypt.compare(usrPassword, user.password))) {
      throw new BadRequestException('Password is incorrect');
    }
    const jwt = await this.jwtService.signAsync({ id: user._id });
    // console.log(user._id);

    const test = await this.jwtService.decode(jwt);
    console.log(test);
    response.cookie('jwt', jwt, { httpOnly: true });
    delete user.password;
    return { message: 'Success', data: { user, jwt } };
  }

  @Post('info')
  async getInfoUser(@Headers('auth') auth: string, @Req() request: Request) {
    try {
      const { id }: any = await this.jwtService.decode(auth);
      console.log(id);
      const user = await this.userService.findOne({ _id: id });
      if (!user) {
        throw new BadRequestException('invalid credentials');
      }

      delete user.password;
      return { message: 'Success', data: { user } };
    } catch (err) {
      throw new HttpException('Expiry session', 403);
    }
    // const cookie = request.cookies.jwt;
    // console.log('cookie', cookie);
    // const data = await this.jwtService.verifyAsync(cookie);
    // console.log(data);
    // if (!data) {
    //   throw new UnauthorizedException();
    // }
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');

    return {
      message: 'Logout successfully',
    };
  }
}
