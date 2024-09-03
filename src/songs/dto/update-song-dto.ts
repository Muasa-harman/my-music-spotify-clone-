import { IsArray, IsDateString, IsMilitaryTime, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";


export class UpdateSongDto{
    @IsString()
    @IsOptional()
    readonly title;

    @IsOptional()
    @IsArray()
    @IsNumber({}, {each: true})
    readonly artist;

    @IsDateString()
    @IsOptional()
    readonly releasedDate: Date;

    @IsMilitaryTime()
    @IsOptional()
    readonly duration: Date;

    @IsString()
    @IsOptional()
    readonly lyrics: string
}