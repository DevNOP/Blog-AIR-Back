/*
  Warnings:

  - You are about to drop the `Posts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Posts";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "imageURL" TEXT NOT NULL,
    "permissionsId" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "dateCreate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "imageURL" TEXT NOT NULL,
    "isEmphasis" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Permissions" (
    "id" TEXT NOT NULL,
    "areas" TEXT NOT NULL,

    CONSTRAINT "Permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostTags" (
    "postId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,

    CONSTRAINT "PostTags_pkey" PRIMARY KEY ("postId","tagId")
);

-- CreateTable
CREATE TABLE "CommentUser" (
    "id" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "dateCreate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "idUser" TEXT NOT NULL,
    "fromIdUser" TEXT NOT NULL,

    CONSTRAINT "CommentUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommentPost" (
    "id" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "qntLike" INTEGER NOT NULL,
    "dateCreate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,

    CONSTRAINT "CommentPost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Quest" (
    "id" TEXT NOT NULL,
    "data" TEXT NOT NULL,

    CONSTRAINT "Quest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Answer" (
    "id" TEXT NOT NULL,
    "option" TEXT NOT NULL,

    CONSTRAINT "Answer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Wishes" (
    "userId" TEXT NOT NULL,
    "answerId" TEXT NOT NULL,
    "questId" TEXT NOT NULL,

    CONSTRAINT "Wishes_pkey" PRIMARY KEY ("userId","answerId","questId")
);

-- CreateTable
CREATE TABLE "ComplaintCommentUser" (
    "id" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "dateCreate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "CommentUserId" TEXT NOT NULL,

    CONSTRAINT "ComplaintCommentUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ComplaintCommentPost" (
    "id" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "dateCreate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "CommentPostId" TEXT NOT NULL,

    CONSTRAINT "ComplaintCommentPost_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_permissionsId_fkey" FOREIGN KEY ("permissionsId") REFERENCES "Permissions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostTags" ADD CONSTRAINT "PostTags_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostTags" ADD CONSTRAINT "PostTags_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentUser" ADD CONSTRAINT "CommentUser_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentUser" ADD CONSTRAINT "CommentUser_fromIdUser_fkey" FOREIGN KEY ("fromIdUser") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentPost" ADD CONSTRAINT "CommentPost_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentPost" ADD CONSTRAINT "CommentPost_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wishes" ADD CONSTRAINT "Wishes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wishes" ADD CONSTRAINT "Wishes_answerId_fkey" FOREIGN KEY ("answerId") REFERENCES "Answer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wishes" ADD CONSTRAINT "Wishes_questId_fkey" FOREIGN KEY ("questId") REFERENCES "Quest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComplaintCommentUser" ADD CONSTRAINT "ComplaintCommentUser_CommentUserId_fkey" FOREIGN KEY ("CommentUserId") REFERENCES "CommentUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComplaintCommentPost" ADD CONSTRAINT "ComplaintCommentPost_CommentPostId_fkey" FOREIGN KEY ("CommentPostId") REFERENCES "CommentPost"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
