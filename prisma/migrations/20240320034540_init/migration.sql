-- CreateTable
CREATE TABLE "Game" (
    "id" TEXT NOT NULL,
    "rounds" INTEGER NOT NULL,
    "numPlayers" INTEGER NOT NULL,
    "numReady" INTEGER NOT NULL,
    "isRandomized" BOOLEAN NOT NULL,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "gameId" TEXT NOT NULL,
    "sendToUserId" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameData" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "aiResponse" TEXT NOT NULL,
    "userResponse" TEXT,
    "gameId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "GameData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "User_gameId_idx" ON "User"("gameId");

-- CreateIndex
CREATE INDEX "GameData_gameId_idx" ON "GameData"("gameId");
