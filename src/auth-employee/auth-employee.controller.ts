import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { AuthEmployeeService } from './auth-employee.service';

@Controller('auth-employee')
export class AuthEmployeeController {
  constructor(private readonly authEmployeeService: AuthEmployeeService) {}

  @Post('sign-in')
  async signinEmployee(@Body() dto: any, @Req() req: any, @Res() res: any) {
    return this.authEmployeeService.signinEmployee(dto, req, res);
  }
}
