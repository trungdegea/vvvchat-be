import * as mongoose from 'mongoose';
import { Prop, SchemaFactory } from '@nestjs/mongoose';

export interface IUser {
  _id?: mongoose.ObjectId;
  id: string;
  name: string;
  username: string;
  password: string;
}

export const UserSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
});

// export type TuDocument = Tu & mongoose.Document

// export class Tu {

//   @Prop({type: String, required: true})
//   id: string;

// }

// export const TuSchema = SchemaFactory.createForClass(Tu);

// class Abc {
//   constructor(
//     private tuModel: mongoose.Model<TuDocument>,
//   ) {

//   }
// }
