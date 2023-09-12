/*
  Warnings:

  - A unique constraint covering the columns `[idGit]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "User_idGit_key" ON "User"("idGit");
