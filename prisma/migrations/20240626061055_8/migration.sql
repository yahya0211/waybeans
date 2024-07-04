/*
  Warnings:

  - You are about to drop the column `cartId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `shippingId` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the `Shipping` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[transactionId]` on the table `Cart` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `transactionId` to the `Cart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `attachment` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cartId` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pay` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productPrice` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Shipping" DROP CONSTRAINT "Shipping_productId_fkey";

-- DropForeignKey
ALTER TABLE "Shipping" DROP CONSTRAINT "Shipping_userId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_shippingId_fkey";

-- DropIndex
DROP INDEX "Transaction_shippingId_key";

-- AlterTable
ALTER TABLE "Cart" ADD COLUMN     "transactionId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "cartId";

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "shippingId",
ADD COLUMN     "attachment" TEXT NOT NULL,
ADD COLUMN     "cartId" TEXT NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "pay" BOOLEAN NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "productPrice" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Shipping";

-- CreateIndex
CREATE UNIQUE INDEX "Cart_transactionId_key" ON "Cart"("transactionId");

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
