/*
  Warnings:

  - A unique constraint covering the columns `[subjectID]` on the table `Professor` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "_ProfessorToSubject" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_ProfessorToSubject_A_fkey" FOREIGN KEY ("A") REFERENCES "Professor" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ProfessorToSubject_B_fkey" FOREIGN KEY ("B") REFERENCES "Subject" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Comment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userID" INTEGER NOT NULL,
    "evaluationID" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Comment_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Comment_evaluationID_fkey" FOREIGN KEY ("evaluationID") REFERENCES "Evaluation" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Comment" ("content", "createdAt", "evaluationID", "id", "updatedAt", "userID") SELECT "content", "createdAt", "evaluationID", "id", "updatedAt", "userID" FROM "Comment";
DROP TABLE "Comment";
ALTER TABLE "new_Comment" RENAME TO "Comment";
CREATE TABLE "new_Evaluation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userID" INTEGER NOT NULL,
    "professorID" INTEGER NOT NULL,
    "subjectID" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Evaluation_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Evaluation_professorID_fkey" FOREIGN KEY ("professorID") REFERENCES "Professor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Evaluation_subjectID_fkey" FOREIGN KEY ("subjectID") REFERENCES "Subject" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Evaluation" ("content", "createdAt", "id", "professorID", "subjectID", "updatedAt", "userID") SELECT "content", "createdAt", "id", "professorID", "subjectID", "updatedAt", "userID" FROM "Evaluation";
DROP TABLE "Evaluation";
ALTER TABLE "new_Evaluation" RENAME TO "Evaluation";
CREATE UNIQUE INDEX "Evaluation_professorID_key" ON "Evaluation"("professorID");
CREATE UNIQUE INDEX "Evaluation_subjectID_key" ON "Evaluation"("subjectID");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "_ProfessorToSubject_AB_unique" ON "_ProfessorToSubject"("A", "B");

-- CreateIndex
CREATE INDEX "_ProfessorToSubject_B_index" ON "_ProfessorToSubject"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Professor_subjectID_key" ON "Professor"("subjectID");
