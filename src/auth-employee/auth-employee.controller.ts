import { Controller } from '@nestjs/common';
import { AuthEmployeeService } from './auth-employee.service';

@Controller('auth-employee')
export class AuthEmployeeController {
  constructor(private readonly authEmployeeService: AuthEmployeeService) {}
}
