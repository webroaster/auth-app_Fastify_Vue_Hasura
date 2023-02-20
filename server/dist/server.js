import fastify from "fastify";
import fastifyCors from "@fastify/cors";
import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";
dotenv.config();
const app = fastify();
app.register(fastifyCors);
const pool = new Pool({
    connectionString: process.env.DB_URL,
});
app.post("/create-user-table", async (request, reply) => {
    // const result = await pool.query(`DROP TABLE users`)
    const result = await pool.query(`
    CREATE TABLE users (
      id serial PRIMARY KEY,
      username varchar(100) NOT NULL,
      email varchar(100) NOT NULL,
      password varchar(100) NOT NULL
    )
  `);
    reply.send(result);
});
app.listen(3000, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`サーバー起動中：${address}`);
});
//# sourceMappingURL=server.js.map