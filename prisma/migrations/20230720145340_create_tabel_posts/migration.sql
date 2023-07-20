-- CreateTable
CREATE TABLE "Posts" (
    "id" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "datePost" TIMESTAMP(3) NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "Posts_pkey" PRIMARY KEY ("id")
);
