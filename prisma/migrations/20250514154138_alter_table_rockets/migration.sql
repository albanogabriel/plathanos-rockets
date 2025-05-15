/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `rockets` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "rockets_name_key" ON "rockets"("name");
