-- CreateEnum
CREATE TYPE "EmployeeRole" AS ENUM ('ADMIN', 'PROGRAMMER', 'CUSTOMER_SUPPORT', 'NOT_ASSIGNED');

-- CreateTable
CREATE TABLE "Employee" (
    "id" TEXT NOT NULL,
    "employeeNumber" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "hashedPassword" TEXT NOT NULL,
    "name" TEXT,
    "jobTitle" "EmployeeRole" NOT NULL DEFAULT 'NOT_ASSIGNED',

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Employee_employeeNumber_key" ON "Employee"("employeeNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_email_key" ON "Employee"("email");
