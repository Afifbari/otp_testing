import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpErrorFilter } from './shared/http-error.filter';
import { LoggingInterceptor } from './shared/logging.interceptor';
import { OtpModule } from './otp/otp.module';
import { EasyconfigModule } from 'nestjs-easyconfig';
import { TestUserService } from './test-user/test-user.service';
import { TestUserController } from './test-user/test-user.controller';
import { TestUserModule } from './test-user/test-user.module';


@Module({
  imports: [
    EasyconfigModule.register({ path: './.env' }),
    MongooseModule.forRoot(`${process.env.DB_CONNECTION}://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?authSource=admin`, { useCreateIndex: true }),
    OtpModule,
    TestUserModule
  ],
  controllers: [AppController, TestUserController],
  providers: [AppService,
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor
    },
    TestUserService
  ],
})
export class AppModule { }
