import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthEmployeeModule } from './auth-employee/auth-employee.module';
import { EmployeeModule } from './employee/employee.module';

@Module({
  imports: [AuthEmployeeModule, EmployeeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
