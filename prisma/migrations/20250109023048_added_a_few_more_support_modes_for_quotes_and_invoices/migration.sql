/*
  Warnings:

  - You are about to drop the column `status` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Quote` table. All the data in the column will be lost.
  - Added the required column `price` to the `QuoteItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product` to the `QuoteItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `QuoteItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unitId` to the `QuoteItem` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "QuoteStatus" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "deletedAt" DATETIME
);

-- CreateTable
CREATE TABLE "Unit" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "deletedAt" DATETIME
);

-- CreateTable
CREATE TABLE "InvoiceStatus" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "deletedAt" DATETIME
);

-- CreateTable
CREATE TABLE "Tax" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "rate" REAL NOT NULL,
    "description" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "deletedAt" DATETIME
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Invoice" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "quoteId" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "total" REAL NOT NULL,
    "comment" TEXT NOT NULL DEFAULT 'unpaid',
    "dueDate" DATETIME NOT NULL,
    "taxId" TEXT,
    "invoiceStatusId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "deletedAt" DATETIME,
    CONSTRAINT "Invoice_taxId_fkey" FOREIGN KEY ("taxId") REFERENCES "Tax" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Invoice_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Invoice_quoteId_fkey" FOREIGN KEY ("quoteId") REFERENCES "Quote" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Invoice_invoiceStatusId_fkey" FOREIGN KEY ("invoiceStatusId") REFERENCES "InvoiceStatus" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Invoice" ("createdAt", "customerId", "deletedAt", "dueDate", "id", "quoteId", "total", "updatedAt") SELECT "createdAt", "customerId", "deletedAt", "dueDate", "id", "quoteId", "total", "updatedAt" FROM "Invoice";
DROP TABLE "Invoice";
ALTER TABLE "new_Invoice" RENAME TO "Invoice";
CREATE TABLE "new_Quote" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "customerId" TEXT NOT NULL,
    "taxId" TEXT,
    "total" REAL NOT NULL,
    "quoteStatusId" TEXT,
    "comment" TEXT NOT NULL DEFAULT 'Pending Approval',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "deletedAt" DATETIME,
    CONSTRAINT "Quote_taxId_fkey" FOREIGN KEY ("taxId") REFERENCES "Tax" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Quote_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Quote_quoteStatusId_fkey" FOREIGN KEY ("quoteStatusId") REFERENCES "QuoteStatus" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Quote" ("createdAt", "customerId", "deletedAt", "id", "total", "updatedAt") SELECT "createdAt", "customerId", "deletedAt", "id", "total", "updatedAt" FROM "Quote";
DROP TABLE "Quote";
ALTER TABLE "new_Quote" RENAME TO "Quote";
CREATE TABLE "new_QuoteItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "product" TEXT NOT NULL,
    "unitId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" REAL NOT NULL,
    "quoteId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "deletedAt" DATETIME,
    CONSTRAINT "QuoteItem_quoteId_fkey" FOREIGN KEY ("quoteId") REFERENCES "Quote" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "QuoteItem_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "Unit" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_QuoteItem" ("id", "quoteId") SELECT "id", "quoteId" FROM "QuoteItem";
DROP TABLE "QuoteItem";
ALTER TABLE "new_QuoteItem" RENAME TO "QuoteItem";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "QuoteStatus_name_key" ON "QuoteStatus"("name");

-- CreateIndex
CREATE UNIQUE INDEX "InvoiceStatus_name_key" ON "InvoiceStatus"("name");
