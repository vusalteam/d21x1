/*
  Warnings:

  - The `result` column on the `Match` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `mode` column on the `Match` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `Match` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `account_type` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `type` on the `BalanceHistory` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `operation` on the `BalanceHistory` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'USER', 'MODERATOR');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ONLINE', 'OFFLINE');

-- CreateEnum
CREATE TYPE "MessageStatus" AS ENUM ('SENT', 'DELIVERED', 'READ');

-- CreateEnum
CREATE TYPE "BalanceHistoryType" AS ENUM ('EXPENSE', 'INCOME');

-- CreateEnum
CREATE TYPE "BalanceHistoryOperation" AS ENUM ('DEPOSIT', 'WITHDRAW', 'PAYMENT');

-- CreateEnum
CREATE TYPE "MatchResult" AS ENUM ('DRAW', 'PENDING', 'UNDEFINED', 'CANCELED', 'FINISHED');

-- CreateEnum
CREATE TYPE "MatchStatus" AS ENUM ('PENDING', 'ACCEPTED', 'DECLINED', 'CONTESTED', 'CANCELED', 'FINISHED');

-- CreateEnum
CREATE TYPE "MatchMode" AS ENUM ('SOLO', 'TEAM');

-- AlterTable
ALTER TABLE "BalanceHistory" DROP COLUMN "type",
ADD COLUMN     "type" "BalanceHistoryType" NOT NULL,
DROP COLUMN "operation",
ADD COLUMN     "operation" "BalanceHistoryOperation" NOT NULL;

-- AlterTable
ALTER TABLE "Match" ADD COLUMN     "desciption" TEXT,
ADD COLUMN     "winner_id" INTEGER,
DROP COLUMN "result",
ADD COLUMN     "result" "MatchResult" NOT NULL DEFAULT 'DRAW',
DROP COLUMN "mode",
ADD COLUMN     "mode" "MatchMode" NOT NULL DEFAULT 'SOLO',
DROP COLUMN "status",
ADD COLUMN     "status" "MatchStatus" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "statusMessage" TEXT NOT NULL DEFAULT '',
DROP COLUMN "account_type",
ADD COLUMN     "account_type" "UserRole" NOT NULL DEFAULT 'USER',
DROP COLUMN "status",
ADD COLUMN     "status" "UserStatus";

-- DropEnum
DROP TYPE "BalanceHistoryOperationType";

-- DropEnum
DROP TYPE "BalanceHistoryTypeType";

-- DropEnum
DROP TYPE "MatchModeType";

-- DropEnum
DROP TYPE "MatchStatusType";

-- DropEnum
DROP TYPE "NatchResultType";

-- DropEnum
DROP TYPE "UserRoleType";

-- DropEnum
DROP TYPE "UserStatusType";

-- CreateTable
CREATE TABLE "Blacklist" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "lists" INTEGER[],

    CONSTRAINT "Blacklist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "status" "MessageStatus" NOT NULL DEFAULT 'SENT',
    "sender_id" INTEGER,
    "recipient_id" INTEGER,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UserFollows" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Blacklist_user_id_key" ON "Blacklist"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "_UserFollows_AB_unique" ON "_UserFollows"("A", "B");

-- CreateIndex
CREATE INDEX "_UserFollows_B_index" ON "_UserFollows"("B");

-- AddForeignKey
ALTER TABLE "Blacklist" ADD CONSTRAINT "Blacklist_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_recipient_id_fkey" FOREIGN KEY ("recipient_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserFollows" ADD CONSTRAINT "_UserFollows_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserFollows" ADD CONSTRAINT "_UserFollows_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
