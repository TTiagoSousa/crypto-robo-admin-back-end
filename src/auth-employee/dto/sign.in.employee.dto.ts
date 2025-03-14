import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";


export class signInEmployee_dto {
  @ApiProperty()
  @IsNotEmpty()
  email: string

  @ApiProperty()
  @IsNotEmpty()
  employeeNumber: string

  @ApiProperty()
  @IsNotEmpty()
  password: string
}