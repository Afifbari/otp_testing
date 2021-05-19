import { IsString,IsNotEmpty } from "class-validator";

export class GenerateOtpDto {
    @IsNotEmpty()
    @IsString()
    phone:string;
}