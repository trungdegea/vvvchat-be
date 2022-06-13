import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IUser } from './user.model';
import { AnyKeys, Model } from 'mongoose';
const { v1: uuidv1, v4: uuidv4 } = require('uuid');

@Injectable({})
export class UserService {
  private users: IUser[] = [];

  constructor(@InjectModel('User') private readonly userModel: Model<IUser>) {}

  async register(username: string, password: string, name: string) {
    const userId = String(uuidv4());
    // const newUser: IUser = { id: userId, name, username, password };
    const newUser = new this.userModel({
      id: userId,
      name,
      username,
      password,
    });
    const result = await newUser.save();
    return result.toObject();
  }

  async findOne(condition: AnyKeys<IUser>) {
    const data = await this.userModel.findOne(condition);
    if (!data) {
      return null;
    }
    return data.toObject();
  }
}
