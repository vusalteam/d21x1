/*
  Warnings:

  - You are about to drop the column `desciption` on the `Match` table. All the data in the column will be lost.
  - You are about to drop the column `recipient_id` on the `Message` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[chat_id]` on the table `Message` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `chat_id` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Made the column `sender_id` on table `Message` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "AttachmentType" AS ENUM ('IMAGE', 'VIDEO', 'DOCUMENT', 'AUDIO', 'FILE', 'OTHER');

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_recipient_id_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_sender_id_fkey";

-- AlterTable
ALTER TABLE "Match" DROP COLUMN "desciption",
ADD COLUMN     "description" TEXT;

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "recipient_id",
ADD COLUMN     "chat_id" INTEGER NOT NULL,
ALTER COLUMN "sender_id" SET NOT NULL;

-- CreateTable
CREATE TABLE "Chat" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Chat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Attachment" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "type" "AttachmentType",
    "message_id" INTEGER,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Attachment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ChatToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Attachment_name_key" ON "Attachment"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Attachment_message_id_key" ON "Attachment"("message_id");

-- CreateIndex
CREATE UNIQUE INDEX "_ChatToUser_AB_unique" ON "_ChatToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_ChatToUser_B_index" ON "_ChatToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Message_chat_id_key" ON "Message"("chat_id");

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "Chat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attachment" ADD CONSTRAINT "Attachment_message_id_fkey" FOREIGN KEY ("message_id") REFERENCES "Message"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChatToUser" ADD CONSTRAINT "_ChatToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Chat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChatToUser" ADD CONSTRAINT "_ChatToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
