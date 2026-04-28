-- CreateEnum
CREATE TYPE "Role" AS ENUM ('EMPLOYEE', 'MANAGER', 'ADMIN');

-- CreateTable
CREATE TABLE "displays" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "author_id" INTEGER NOT NULL,

    CONSTRAINT "displays_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "display_items" (
    "id" SERIAL NOT NULL,
    "product_name" TEXT NOT NULL,
    "plu" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "status" TEXT NOT NULL DEFAULT 'active',
    "location" TEXT,
    "added_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "removed_at" TIMESTAMP(3),
    "display_id" INTEGER NOT NULL,
    "author_id" INTEGER NOT NULL,

    CONSTRAINT "display_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "display_comments" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "action_type" TEXT NOT NULL DEFAULT 'note',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "display_id" INTEGER NOT NULL,
    "author_id" INTEGER NOT NULL,
    "display_item_id" INTEGER,

    CONSTRAINT "display_comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'EMPLOYEE',

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "display_items_display_id_plu_key" ON "display_items"("display_id", "plu");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "displays" ADD CONSTRAINT "displays_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "display_items" ADD CONSTRAINT "display_items_display_id_fkey" FOREIGN KEY ("display_id") REFERENCES "displays"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "display_items" ADD CONSTRAINT "display_items_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "display_comments" ADD CONSTRAINT "display_comments_display_id_fkey" FOREIGN KEY ("display_id") REFERENCES "displays"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "display_comments" ADD CONSTRAINT "display_comments_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "display_comments" ADD CONSTRAINT "display_comments_display_item_id_fkey" FOREIGN KEY ("display_item_id") REFERENCES "display_items"("id") ON DELETE SET NULL ON UPDATE CASCADE;
