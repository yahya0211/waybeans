/*
  Warnings:

  - You are about to drop the column `qty` on the `Ticket` table. All the data in the column will be lost.
  - Added the required column `qty` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Admin', 'Buyer');

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "qty" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "qty";
