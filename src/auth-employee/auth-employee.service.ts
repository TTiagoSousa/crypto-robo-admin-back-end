import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { signInEmployee_dto } from './dto/sign.in.employee.dto';
import { signinEmployee } from './helpers/sign.in.employee';
import { Request, Response } from 'express';

@Injectable()
export class AuthEmployeeService {
constructor(
  private readonly jwtService: JwtService,
) {}  

  async signinEmployee(dto: signInEmployee_dto, req: Request, res: Response) {
    const result = await signinEmployee(dto, this.jwtService, req, res);
    return result;
  }
}
