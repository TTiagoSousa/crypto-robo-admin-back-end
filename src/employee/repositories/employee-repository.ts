import { Prisma, Employee } from "@prisma/client"

export interface EmployeeRepository{
  create(data: Prisma.EmployeeUncheckedCreateInput): Promise<Employee>
}