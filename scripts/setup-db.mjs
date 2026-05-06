/**
 * Script para criar a tabela de assinaturas no Supabase.
 *
 * COMO USAR:
 *   1. Adicione a senha do banco no arquivo .env:
 *      SUPABASE_DB_PASSWORD=sua_senha_aqui
 *   2. Execute: node scripts/setup-db.mjs
 *
 * OU execute o SQL diretamente em:
 *   https://supabase.com/dashboard/project/bpnphbcdxjkdgsufclhj/sql/new
 */

import { readFileSync } from "node:fs";
import { createConnection } from "node:net";
import pg from "pg";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { config } from "dotenv";

config();

const __dirname = dirname(fileURLToPath(import.meta.url));

const DB_PASSWORD = process.env.SUPABASE_DB_PASSWORD;
if (!DB_PASSWORD) {
  console.error("❌ SUPABASE_DB_PASSWORD não definida no arquivo .env");
  process.exit(1);
}

const PROJECT_REF = "bpnphbcdxjkdgsufclhj";

const connectionStrings = [
  `postgresql://postgres:${DB_PASSWORD}@db.${PROJECT_REF}.supabase.co:5432/postgres`,
  `postgresql://postgres.${PROJECT_REF}:${DB_PASSWORD}@aws-0-sa-east-1.pooler.supabase.com:5432/postgres`,
  `postgresql://postgres.${PROJECT_REF}:${DB_PASSWORD}@aws-0-us-east-1.pooler.supabase.com:5432/postgres`,
];

const sql = readFileSync(resolve(__dirname, "../supabase/migrations/001_create_subscriptions.sql"), "utf8");

async function run(connStr) {
  const client = new pg.Client({ connectionString: connStr, ssl: { rejectUnauthorized: false } });
  await client.connect();
  console.log("✅ Conectado ao banco!");
  await client.query(sql);
  console.log("✅ Tabela subscriptions criada com sucesso!");
  await client.end();
}

for (const connStr of connectionStrings) {
  try {
    await run(connStr);
    process.exit(0);
  } catch (e) {
    console.log(`⚠ Falha: ${e.message.substring(0, 80)}`);
  }
}

console.error("❌ Não foi possível conectar. Acesse o SQL Editor do Supabase e execute manualmente:");
console.log("\nhttps://supabase.com/dashboard/project/bpnphbcdxjkdgsufclhj/sql/new\n");
console.log(sql);
