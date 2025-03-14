import { JwtService } from "@nestjs/jwt";
import { Request, Response } from 'express';
import { signInEmployee_dto } from "../dto/sign.in.employee.dto";
import { PrismaEmployeeRepository } from "src/employee/repositories/prisma/prisma-employee-repository";
import { isValidEmail } from "src/utils/email/is.valid.email";
import { BadRequestException } from "@nestjs/common";
import { comparePassword } from "src/utils/password/compare.password";
import { employeeCreateToken } from "src/utils/token/employee.signin.token";

/**
 * Function to authenticate an employee.
 *
 * Validations performed:
 * 1. Validate if the email has a correct format.
 * 2. Check if there is an employee with the provided email.
 * 3. Check if there is an employee with the provided employee number.
 * 4. Compare the provided password with the hashed password stored in the database.
 * 5. Create and validate access and refresh tokens.
 * 6. Store the tokens in the HTTP response cookies.
 *
 * @param dto - Employee login data (email, password, employeeNumber).
 * @param jwt - NestJS JWT service (not directly used here).
 * @param req - Express request object.
 * @param res - Express response object.
 */

export async function signinEmployee (
  dto: signInEmployee_dto,
  jwt: JwtService,
  req: Request,
  res: Response,
) {

  // Destructure the login data from the DTO
  const { email, password, employeeNumber } = dto

  // Instantiate the employee repository using Prisma
  const employeesRepository = new PrismaEmployeeRepository();

  // 1. Validate if the email format is correct
  if(!isValidEmail) {
    throw new BadRequestException('Invalid email');
  }

  // 2. Find the employee by the provided email
  const findEmployeeByEmail = await employeesRepository.findByEmail(email);
  if(!findEmployeeByEmail){
    throw new BadRequestException('Invalid email or password');
  }

  // 3. Find the employee by the provided employee number
  const findEmployeeByNumber = await employeesRepository.findByEmployeeNumber(employeeNumber);
  if(!findEmployeeByNumber){
    throw new BadRequestException('Invalid employee number');
  }

  // 4. Compare the provided password with the stored hashed password
  const isMatch = await comparePassword({
    password,
    hash: findEmployeeByEmail.hashedPassword,
  });

  if(!isMatch){
    throw new BadRequestException('Invalid email or password');
  }

  // 5. Create access and refresh tokens for the authenticated employee
  const { token, refreshToken } = await employeeCreateToken({
    id: findEmployeeByEmail.id,
    email: findEmployeeByEmail.email,
    EmployeeRole: findEmployeeByEmail.jobTitle
  })

  // Validate if both tokens were successfully created
  if(!token || !refreshToken){
    throw new BadRequestException('Invalid email or password');
  }

  // 6. Set the tokens in the response cookies
  res.cookie('refreshToken', refreshToken)
  res.cookie('token', token)

  // Return the access token in the response
  return res.send({ token })
}
