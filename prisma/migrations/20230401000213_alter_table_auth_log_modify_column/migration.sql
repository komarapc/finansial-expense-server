/*
  Warnings:

  - Added the required column `type` to the `AuthLog` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AuthType" AS ENUM ('LOGIN', 'LOGOUT');

-- DropIndex
DROP INDEX "AuthLog_token_key";

-- AlterTable
ALTER TABLE "AuthLog" ADD COLUMN     "type" "AuthType" NOT NULL;
