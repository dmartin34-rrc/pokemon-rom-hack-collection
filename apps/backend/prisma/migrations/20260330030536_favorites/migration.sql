-- CreateTable
CREATE TABLE "Favorites" (
    "id" SERIAL NOT NULL,
    "romId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Favorites_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Favorites_romId_key" ON "Favorites"("romId");

-- AddForeignKey
ALTER TABLE "Favorites" ADD CONSTRAINT "Favorites_romId_fkey" FOREIGN KEY ("romId") REFERENCES "ROM"("id") ON DELETE CASCADE ON UPDATE CASCADE;
