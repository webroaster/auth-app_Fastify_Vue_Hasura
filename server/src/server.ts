import fastify from "fastify"
import cors from "@fastify/cors"
import axios from "axios"
import dotenv from "dotenv"

dotenv.config()

const app = fastify({
  logger: true,
})

await app.register(cors, {
  origin: "*",
})

// ユーザー情報取得
app.get("/users", async (request, reply) => {
  const query = `
    {
      users_users(order_by: {id: asc}) {
        id
        username
        email
        password
      }
    }
  `
  const { data } = await axios.post(`${process.env.GRAPHQL_URL}`, {
    query,
  })

  reply.send(data.data)
})

// ユーザー登録
app.post("/create", async (request, reply) => {
  const body = request.body as {
    username: string
    email: string
    password: string
  }
  const query = `
    mutation {
      insert_users_users (objects: [{
        username: "${body.username}",
        email: "${body.email}",
        password: "${body.password}"
      }]) {
        returning {
          id
          username
          email
          password
        }
      }
    }
  `

  const { data } = await axios.post(`${process.env.GRAPHQL_URL}`, {
    query,
  })

  reply.send(data.data)
})

// ユーザー更新
app.post("/update", async (request, reply) => {
  const body = request.body as {
    id: number
    username: string
    email: string
    password: string
  }

  const query = `
    mutation {
      update_users_users(
        where: {id: {_eq: ${body.id}}},
        _set: {
          username: "${body.username}",
          email: "${body.email}",
          password: "${body.password}"
        }
      ) {
        affected_rows
        returning {
          id
          username
          email
          password
        }
      }
    }
  `

  const { data } = await axios.post(`${process.env.GRAPHQL_URL}`, {
    query,
  })

  return reply.send(data.data)
})

// ユーザー削除
app.post("/delete", async (request, reply) => {
  const body = request.body as {
    id: number
  }

  const query = `
    mutation {
      delete_users_users(where: {id: {_eq: ${body.id}}}) {
        affected_rows
      }
    }
  `

  await axios.post(`${process.env.GRAPHQL_URL}`, { query })

  return reply.send({ message: "正常に削除されました。" })
})

app.post("/login", async (request, reply) => {
  const body = request.body as {
    usernameOrEmail: string
    password: string
  }

  const query = `
  query {
    users_users(
      where: {
        _or: [
          {username: {_eq: "${body.usernameOrEmail}"}},
          {email: {_eq: "${body.usernameOrEmail}"}}
        ]
        password: {_eq: "${body.password}"}
      }
    ) {
      id
      username
      email
      password
    }
  }
  `

  const { data } = await axios.post(`${process.env.GRAPHQL_URL}`, {
    query,
  })

  return reply.send(data.data)
})

app.listen(3000, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`サーバー起動中：${address}`)
})
