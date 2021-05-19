import { HttpModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OtpLogSchema } from '../schemas/otplog.schema';
import { OtpController } from './otp.controller';
import { OtpService } from './otp.service';
import { TestUserSchema } from '../schemas/testUser.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'OtpLog', schema: OtpLogSchema }, { name: 'TestUser', schema: TestUserSchema }]),
    HttpModule
  ],
  controllers: [OtpController],
  providers: [OtpService]
})
export class OtpModule { }
