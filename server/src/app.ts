import fastify from "fastify"
import cors from "@fastify/cors"
import routes from "./routes"

const app = fastify({
  logger: true,
})

app.register(cors, {
  origin: "*",
})

app.register(routes)

app.listen(3000, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`サーバー起動中：${address}`)
})
