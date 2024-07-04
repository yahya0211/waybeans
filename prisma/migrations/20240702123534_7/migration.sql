/*
  Warnings:

  - You are about to drop the column `transactionId` on the `Cart` table. All the data in the column will be lost.
  - You are about to drop the column `cartId` on the `Transaction` table. All the data in the column will be lost.
  - Added the required column `totalPrice` to the `Cart` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_transactionId_fkey";

-- AlterTable
ALTER TABLE "Cart" DROP COLUMN "transactionId",
ADD COLUMN     "totalPrice" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "cartId";
