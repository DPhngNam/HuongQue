/*
  Warnings:

  - The `status` column on the `registration` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "RegistrationStatusPrisma" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- AlterTable
ALTER TABLE "registration" DROP COLUMN "status",
ADD COLUMN     "status" "RegistrationStatusPrisma" NOT NULL DEFAULT 'PENDING';

-- DropEnum
DROP TYPE "RegistrationStatus";
