import {IsInt, IsNotEmpty} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";


export class GenerateTeacherInvitationUrlDto{

    @IsNotEmpty()
    @IsInt({message: 'InstituteId must be an integer'})
    @ApiProperty({ description: 'The institute id' })
    instituteId: number;

}