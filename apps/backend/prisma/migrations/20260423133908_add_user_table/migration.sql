/*
  Warnings:

  - A unique constraint covering the columns `[romId,userId]` on the table `Favorites` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[page,romId,userId]` on the table `ItemList` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Favorites` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `ItemList` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "ItemList_page_romId_key";

-- AlterTable
ALTER TABLE "Favorites" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ItemList" ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "clerkId" TEXT NOT NULL,
    "username" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_clerkId_key" ON "User"("clerkId");

-- CreateIndex
CREATE INDEX "Favorites_userId_idx" ON "Favorites"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Favorites_romId_userId_key" ON "Favorites"("romId", "userId");

-- CreateIndex
CREATE INDEX "ItemList_userId_idx" ON "ItemList"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ItemList_page_romId_userId_key" ON "ItemList"("page", "romId", "userId");

-- AddForeignKey
ALTER TABLE "ItemList" ADD CONSTRAINT "ItemList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorites" ADD CONSTRAINT "Favorites_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
