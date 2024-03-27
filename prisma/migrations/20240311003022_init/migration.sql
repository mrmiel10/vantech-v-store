-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "kindeId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "picture" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "User_kindeId_key" ON "User"("kindeId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
