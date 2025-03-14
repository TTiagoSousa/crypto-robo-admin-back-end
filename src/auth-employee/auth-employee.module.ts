import { Module } from '@nestjs/common';
import { AuthEmployeeService } from './auth-employee.service';
import { AuthEmployeeController } from './auth-employee.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtSecret } from 'src/utils/constants';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtSecret, // Replace with your actual secret key
      signOptions: { expiresIn: '1d' }, // Token expiration
    }),
  ],
  controllers: [AuthEmployeeController],
  providers: [AuthEmployeeService],
})
export class AuthEmployeeModule {}
