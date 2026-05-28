-- CreateTable
CREATE TABLE "usuario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senhaHash" TEXT NOT NULL,
    "papel" TEXT NOT NULL DEFAULT 'OPERADOR'
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_entrega" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "descricao" TEXT NOT NULL,
    "origem" TEXT NOT NULL,
    "destino" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'CRIADA',
    "motoristaId" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "criadorId" INTEGER,
    CONSTRAINT "entrega_motoristaId_fkey" FOREIGN KEY ("motoristaId") REFERENCES "motorista" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "entrega_criadorId_fkey" FOREIGN KEY ("criadorId") REFERENCES "usuario" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_entrega" ("createdAt", "descricao", "destino", "id", "motoristaId", "origem", "status", "updatedAt") SELECT "createdAt", "descricao", "destino", "id", "motoristaId", "origem", "status", "updatedAt" FROM "entrega";
DROP TABLE "entrega";
ALTER TABLE "new_entrega" RENAME TO "entrega";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "usuario_email_key" ON "usuario"("email");
