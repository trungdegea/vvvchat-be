import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { MessageService } from './message.service';

@Controller('message')
export class MessageController {
  constructor(
    private readonly messageService: MessageService,
    private jwtService: JwtService,
  ) {}

  @Post('sendMsg')
  async sendsg(
    @Headers('auth') auth: string,
    @Body('msg') msg: string,
    @Req() request: Request,
  ) {
    try {
      console.log(auth);
      const { id: sender }: any = await this.jwtService.decode(auth);
      console.log(sender);
      // const cookie = request.cookies['jwt'];

      // const data = await this.jwtService.verifyAsync(cookie);
      // if (!data) {
      //   throw new UnauthorizedException();
      // }
      const message = this.messageService.sendMessage(msg, sender);
      return message;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  @Get('getAllMsg')
  async getAllMsg(@Req() request: Request) {
    try {
      // const cookie = request.cookies['jwt'];

      // const data = await this.jwtService.verifyAsync(cookie);
      // if (!data) {
      //   throw new UnauthorizedException();
      // }
      const list = await this.messageService.getAllMessages();
      console.log('msg', list);
      return { message: 'success', data: list };
    } catch (error) {
      console.log(error.message);
      throw new UnauthorizedException();
    }
  }
}
