import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { OtpModule } from '../src/otp/otp.module';
import { OtpService} from '../src/otp/otp.service'
import { getModelToken } from '@nestjs/mongoose';

describe('OtpController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [OtpModule],
    }).overrideProvider(OtpService).useValue(OtpService).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  })

  it('/otp (GET)', () => {
    return request(app.getHttpServer())
      .get('/otp')
      .expect(200)
      .expect('Hello World!');
  });

  afterAll(async () => {
    await app.close();
  });
});
