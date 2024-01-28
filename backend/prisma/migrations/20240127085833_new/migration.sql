-- CreateTable
CREATE TABLE "detail_table" (
    "sr_no" INTEGER NOT NULL,
    "item_code" TEXT NOT NULL,
    "item_name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "qty" INTEGER NOT NULL,
    "rate" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "vr_no" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "detail_table_sr_no_key" ON "detail_table"("sr_no");
