-- CreateEnum
CREATE TYPE "RegistrationStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateTable
CREATE TABLE "registration" (
    "id" UUID NOT NULL,
    "useremail" TEXT NOT NULL,
    "image" TEXT[],
    "store_name" TEXT NOT NULL,
    "store_address" TEXT NOT NULL,
    "store_sdt" TEXT NOT NULL,
    "store_email" TEXT NOT NULL,
    "note" TEXT,
    "status" "RegistrationStatus" NOT NULL DEFAULT 'PENDING',
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "registration_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "registration_useremail_key" ON "registration"("useremail");

-- CreateIndex
CREATE UNIQUE INDEX "registration_store_email_key" ON "registration"("store_email");
