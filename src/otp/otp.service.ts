import { HttpException, HttpService, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { map } from 'rxjs/operators';
import { OtpLog } from '../schemas/otplog.schema';
import { GenerateOtpDto } from './dto/generate-otp.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { TestUser } from 'src/schemas/testUser.schema';

@Injectable()
export class OtpService {
    constructor(
        @InjectModel('OtpLog') private readonly OtpLogModel: Model<OtpLog>,
        @InjectModel('TestUser') private readonly TestUser: Model<TestUser>,
        private httpService: HttpService
    ) { }

    async generateOTP(GenerateOtpDto: GenerateOtpDto) {
        try {
            const otp = this.createNewOTP();
            let newLog = new this.OtpLogModel({
                phone: GenerateOtpDto.phone,
                otp: otp
            });
            const testUser = await this.TestUser.findOne({ phone: GenerateOtpDto.phone });
            if (testUser) {
                await new this.OtpLogModel({
                    phone: GenerateOtpDto.phone,
                    otp: testUser.otp
                }).save();
                return {
                    status: true,
                    statusCode: 201,
                    message: "OTP Generate Successful"
                }
            }
            const createdLog = await newLog.save();

            const { data } = await this.httpService.post(`${process.env.SMS_SERVICE_URL}/sms/send-sms`, {
                phone_number: createdLog.phone,
                message_body: `Your phone verification code is ${createdLog.otp}`,
                service_id: process.env.SMS_SERVICE_ID,
                service_token: process.env.SMS_SERVICE_TOKEN
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).toPromise();

            if (data.statusCode === 201) {
                return {
                    status: true,
                    statusCode: 201,
                    message: "OTP Generate Successful"
                }
            }
        } catch (err) {
            console.log(err);
            throw new HttpException({
                statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
                error: 'database error',
                message: err.message,
            }, HttpStatus.UNPROCESSABLE_ENTITY);
        }

    }

    createNewOTP() {
        var digits = '0123456789';
        let OTP = '';
        for (let i = 0; i < 6; i++) {
            OTP += digits[Math.floor(Math.random() * 10)];
        }
        return OTP;
    }

    async verifyOTP(VerifyOtpDto: VerifyOtpDto) {
        try {
            const otpLog = await this.OtpLogModel.find({
                phone: VerifyOtpDto.phone,
                verification_status: 'unverified'
            }).sort({ '_id': -1 }).limit(1);

            if (otpLog.length === 0) {
                throw new HttpException({
                    statusCode: HttpStatus.NOT_FOUND,
                    error: 'not found',
                    message: 'OTP Not Found',
                }, HttpStatus.NOT_FOUND);
            }

            if (otpLog[0].otp === VerifyOtpDto.otp) {
                const { _id } = otpLog[0];
                const updatedLog = await this.OtpLogModel.updateOne({ _id }, {
                    verification_status: 'verified'
                });
                if (updatedLog) {
                    return {
                        status: true,
                        statusCode: HttpStatus.OK,
                        message: 'OTP Verified Successfully'
                    }
                }
            }

            return {
                status: false,
                statusCode: HttpStatus.BAD_REQUEST,
                message: 'OTP Verified Failed'
            }

        } catch (err) {
            throw new HttpException({
                statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
                error: 'database error',
                message: err.message,
            }, HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }

    getHello(): string {
        return 'Hello World!';
    }
}
