-- CreateTable
CREATE TABLE "ROM" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "tags" TEXT[],
    "img" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "completed" BOOLEAN NOT NULL,
    "multiplayer" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ROM_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemList" (
    "id" SERIAL NOT NULL,
    "page" TEXT NOT NULL,
    "romId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ItemList_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ItemList_page_romId_key" ON "ItemList"("page", "romId");

-- AddForeignKey
ALTER TABLE "ItemList" ADD CONSTRAINT "ItemList_romId_fkey" FOREIGN KEY ("romId") REFERENCES "ROM"("id") ON DELETE CASCADE ON UPDATE CASCADE;
