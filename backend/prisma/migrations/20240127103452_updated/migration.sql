-- DropIndex
DROP INDEX "detail_table_sr_no_key";

-- AlterTable
ALTER TABLE "detail_table" ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "detail_table_pkey" PRIMARY KEY ("id");
