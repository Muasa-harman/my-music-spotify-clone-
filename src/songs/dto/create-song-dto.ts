import { IsArray, IsDateString, IsMilitaryTime, IsNotEmpty, IsString } from "class-validator";

export class CreateSongDto{
    @IsString()
    @IsNotEmpty()
    readonly title: string;

    @IsNotEmpty()
    @IsArray()
    @IsString({each: true})
    readonly artists: string[];

    @IsNotEmpty()
    @IsDateString()
    readonly releasedDate: string;

    @IsMilitaryTime()
    @IsNotEmpty()
    readonly duration: string;

}