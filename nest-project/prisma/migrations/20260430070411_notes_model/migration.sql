-- CreateEnum
CREATE TYPE "NoteTargetType" AS ENUM ('COMPANY', 'POSITION', 'APPLICATION');

-- CreateTable
CREATE TABLE "Note" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "information" TEXT NOT NULL,
    "targetId" INTEGER NOT NULL,
    "targetType" "NoteTargetType" NOT NULL,
    "accountId" INTEGER NOT NULL,

    CONSTRAINT "Note_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;
