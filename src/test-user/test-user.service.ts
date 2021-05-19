import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TestUser } from 'src/schemas/testUser.schema';

@Injectable()
export class TestUserService {
    // constructor(
    //     @InjectModel('TestUser') private readonly TestUser: Model<TestUser>
    // ) { }

    // getTestUserByPhone(phone: string) {
    //     return this.TestUser.findOne({
    //         phone
    //     });
    // }
}
