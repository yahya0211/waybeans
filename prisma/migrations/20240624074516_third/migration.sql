/*
  Warnings:

  - Changed the type of `nik` on the `Order` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "nik",
ADD COLUMN     "nik" INTEGER NOT NULL;
