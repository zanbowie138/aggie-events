// import { DB } from 'kysely-codegen';
import { DB } from "./types/dbtypes";
import { Pool } from "pg";
import { Kysely, PostgresDialect } from "kysely";

const dialect = new PostgresDialect({
  pool: new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 10,
  }),
});

// Database interface is passed to Kysely's constructor, and from now on, Kysely
// knows your database structure.
// Dialect is passed to Kysely's constructor, and from now on, Kysely knows how
// to communicate with your database.
export const db = new Kysely<DB>({
  dialect,
});

// Test db
export const testDB = async () => {
  db.selectFrom("users")
    .selectAll("users")
    .execute()
    .then(() => {
      console.log("Database connection successful!");
    })
    .catch((error) => {
      console.log("PostgreSQL database is invalid with db string: " + process.env.DATABASE_URL);
      throw new Error("Error testing db: " + error);
    });
};
