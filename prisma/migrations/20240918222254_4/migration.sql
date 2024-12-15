/*
  Warnings:

  - Made the column `postCode` on table `Transaction` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Transaction" ALTER COLUMN "postCode" SET NOT NULL,
ALTER COLUMN "postCode" SET DATA TYPE TEXT;
