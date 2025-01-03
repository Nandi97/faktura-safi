/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Menu` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[listOrder]` on the table `Menu` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Menu_title_key" ON "Menu"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Menu_listOrder_key" ON "Menu"("listOrder");
