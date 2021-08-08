-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Log" (
    "registeredAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "finishedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "taskId" INTEGER NOT NULL,
    FOREIGN KEY ("taskId") REFERENCES "Task" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Log" ("finishedAt", "registeredAt", "taskId") SELECT "finishedAt", "registeredAt", "taskId" FROM "Log";
DROP TABLE "Log";
ALTER TABLE "new_Log" RENAME TO "Log";
CREATE UNIQUE INDEX "Log.registeredAt_unique" ON "Log"("registeredAt");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
