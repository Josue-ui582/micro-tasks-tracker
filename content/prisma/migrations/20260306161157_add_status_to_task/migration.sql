/*
  Warnings:

  - You are about to drop the column `completed` on the `Task` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED');

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "completed",
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'PENDING';
