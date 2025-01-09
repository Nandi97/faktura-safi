/*
  Warnings:

  - Added the required column `invoiceNumber` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quoteNumber` to the `Quote` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Invoice" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "invoiceNumber" INTEGER NOT NULL,
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
INSERT INTO "new_Invoice" ("comment", "createdAt", "customerId", "deletedAt", "dueDate", "id", "invoiceStatusId", "quoteId", "taxId", "total", "updatedAt") SELECT "comment", "createdAt", "customerId", "deletedAt", "dueDate", "id", "invoiceStatusId", "quoteId", "taxId", "total", "updatedAt" FROM "Invoice";
DROP TABLE "Invoice";
ALTER TABLE "new_Invoice" RENAME TO "Invoice";
CREATE UNIQUE INDEX "Invoice_invoiceNumber_key" ON "Invoice"("invoiceNumber");
CREATE TABLE "new_Quote" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "quoteNumber" INTEGER NOT NULL,
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
INSERT INTO "new_Quote" ("comment", "createdAt", "customerId", "deletedAt", "id", "quoteStatusId", "taxId", "total", "updatedAt") SELECT "comment", "createdAt", "customerId", "deletedAt", "id", "quoteStatusId", "taxId", "total", "updatedAt" FROM "Quote";
DROP TABLE "Quote";
ALTER TABLE "new_Quote" RENAME TO "Quote";
CREATE UNIQUE INDEX "Quote_quoteNumber_key" ON "Quote"("quoteNumber");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
