-- CreateEnum
CREATE TYPE "Status" AS ENUM ('A', 'I');

-- CreateTable
CREATE TABLE "header_table" (
    "vr_no" INTEGER NOT NULL,
    "vr_date" TIMESTAMP(3) NOT NULL,
    "ac_name" TEXT NOT NULL,
    "ac_amt" DOUBLE PRECISION NOT NULL,
    "status" "Status" NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "header_table_vr_no_key" ON "header_table"("vr_no");
