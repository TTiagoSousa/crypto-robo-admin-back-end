import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthEmployeeModule } from './auth-employee/auth-employee.module';

@Module({
  imports: [AuthEmployeeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
