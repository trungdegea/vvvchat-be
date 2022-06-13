import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IMessage } from './message.model';
const { v1: uuidv1, v4: uuidv4 } = require('uuid');

@Injectable({})
export class MessageService {
  private messages: IMessage[] = [];

  constructor(
    @InjectModel('Message') private readonly msgModel: Model<IMessage>,
  ) {}

  async sendMessage(msg: string, sender: string) {
    const id = String(uuidv4());
    const newMsg = new this.msgModel({
      id,
      msg,
      sender,
    });

    const result = await newMsg.save();
    console.log(result);
    return {
      message: 'Send message successfully',
    };
  }

  async getAllMessages() {
    const allMsg = await this.msgModel
      .find()
      .populate('sender', ['username', 'name']);
    console.log(allMsg);
    if (!allMsg) return null;
    return allMsg;
  }
}
