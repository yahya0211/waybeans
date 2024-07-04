/*
  Warnings:

  - You are about to drop the column `cartId` on the `Cart` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Cart" DROP COLUMN "cartId";

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "productPhoto" DROP NOT NULL;
