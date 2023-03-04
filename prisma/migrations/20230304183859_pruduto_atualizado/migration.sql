/*
  Warnings:

  - You are about to drop the column `productId` on the `Requests` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "_ProductToRequests" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_ProductToRequests_A_fkey" FOREIGN KEY ("A") REFERENCES "Product" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ProductToRequests_B_fkey" FOREIGN KEY ("B") REFERENCES "Requests" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Requests" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "data" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Requests_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Requests" ("data", "id", "status", "userId") SELECT "data", "id", "status", "userId" FROM "Requests";
DROP TABLE "Requests";
ALTER TABLE "new_Requests" RENAME TO "Requests";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "_ProductToRequests_AB_unique" ON "_ProductToRequests"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductToRequests_B_index" ON "_ProductToRequests"("B");
