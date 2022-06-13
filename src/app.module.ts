import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageModule } from './message/message.module';
import { AppGateway } from './app.gateway';

@Module({
  imports: [
    AuthModule,
    UserModule,
    MongooseModule.forRoot(
      'mongodb+srv://trung:123456Trung@cluster0.xvhk9ho.mongodb.net/?retryWrites=true&w=majority',
    ),
    MessageModule,
  ],
  providers: [AppGateway],
})
export class AppModule {}
