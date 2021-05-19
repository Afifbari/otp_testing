import { IsString,IsNotEmpty } from "class-validator";

export class VerifyOtpDto {
    @IsNotEmpty()
    @IsString()
    phone:string;

    @IsNotEmpty()
    @IsString()
    otp:string;
}