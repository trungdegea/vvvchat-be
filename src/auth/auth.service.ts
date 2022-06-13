import { Injectable } from '@nestjs/common';

@Injectable({})
export class AuthService {
  login() {
    return { msg: 'You have to login' };
  }

  register() {
    return { msg: 'You have to register' };
  }
}
