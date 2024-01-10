/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `TestType` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "TestType" ALTER COLUMN "code" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "TestType_code_key" ON "TestType"("code");
