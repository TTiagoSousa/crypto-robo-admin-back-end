import { Module } from '@nestjs/common';
import { AuthEmployeeService } from './auth-employee.service';
import { AuthEmployeeController } from './auth-employee.controller';

@Module({
  controllers: [AuthEmployeeController],
  providers: [AuthEmployeeService],
})
export class AuthEmployeeModule {}
