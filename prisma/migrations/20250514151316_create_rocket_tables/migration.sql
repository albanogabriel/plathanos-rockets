-- CreateTable
CREATE TABLE "rockets" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "height" INTEGER NOT NULL,
    "diameter" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL,
    "image_profile" TEXT NOT NULL,

    CONSTRAINT "rockets_pkey" PRIMARY KEY ("id")
);
