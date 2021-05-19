import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { GenerateOtpDto } from './dto/generate-otp.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { OtpService } from './otp.service';

@Controller('otp')
export class OtpController {
    constructor(private otpService: OtpService){}

    @Post('/generate')
    @UsePipes(ValidationPipe)
    async generateOTP(
        @Body() GenerateOtpDto: GenerateOtpDto
    ): Promise<Object> {
       return this.otpService.generateOTP(GenerateOtpDto);
    }

    @Post('/verify')
    @UsePipes(ValidationPipe)
    async verifyOTP(
        @Body() VerifyOtpDto: VerifyOtpDto
    ): Promise<Object> {
       return this.otpService.verifyOTP(VerifyOtpDto);
    }

    @Get('/')
    getHello(): string {
        return this.otpService.getHello();
    }
}
