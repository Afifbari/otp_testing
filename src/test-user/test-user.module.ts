import { Module, HttpModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TestUserSchema } from '../schemas/testUser.schema';
import { TestUserController } from './test-user.controller';
import { TestUserService } from './test-user.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'TestUser', schema: TestUserSchema }]),
        HttpModule
    ],
    controllers: [TestUserController],
    providers: [TestUserService]
})

export class TestUserModule { }
