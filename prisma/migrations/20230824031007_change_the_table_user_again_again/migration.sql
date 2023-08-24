-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_permissionsId_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "permissionsId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_permissionsId_fkey" FOREIGN KEY ("permissionsId") REFERENCES "Permissions"("id") ON DELETE SET NULL ON UPDATE CASCADE;
