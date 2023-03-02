// import { QueryResult } from "pg"
import axios from "axios";
import dotenv from "dotenv";
// import User from "./types/User"
dotenv.config();
const TABLE_NAME = process.env.TABLE_NAME;
const graphqlAxiosInstance = axios.create({
    baseURL: process.env.GRAPHQL_URL,
});
// ユーザー情報取得
export const getUserController = {
    handler: async (_, reply) => {
        const query = `
    {
      ${TABLE_NAME}(order_by: {id: asc}) {
        id
        username
        email
        password
      }
    }
  `;
        const { data } = await graphqlAxiosInstance.post("", {
            query,
        });
        return reply.send(data.data);
    },
};
// // ユーザー登録
// app.post("/create", async (request, reply) => {
//   const body = request.body as User
//   const query = `
//     mutation {
//       insert_${TABLE_NAME} (objects: [{
//         username: "${body.username}",
//         email: "${body.email}",
//         password: "${body.password}"
//       }]) {
//         returning {
//           id
//           username
//           email
//           password
//         }
//       }
//     }
//   `
//   const { data } = await graphqlAxiosInstance.post("", {
//     query,
//   })
//   reply.send(data.data)
// })
// // ユーザー更新
// app.post("/update", async (request, reply) => {
//   const body = request.body as User
//   const query = `
//     mutation {
//       update_${TABLE_NAME}(
//         where: {id: {_eq: ${body.id}}},
//         _set: {
//           username: "${body.username}",
//           email: "${body.email}",
//           password: "${body.password}"
//         }
//       ) {
//         affected_rows
//         returning {
//           id
//           username
//           email
//           password
//         }
//       }
//     }
//   `
//   const { data } = await graphqlAxiosInstance.post("", {
//     query,
//   })
//   return reply.send(data.data)
// })
// // ユーザー削除
// app.post("/delete", async (request, reply) => {
//   const body = request.body as User
//   const query = `
//     mutation {
//       delete_${TABLE_NAME}(where: {id: {_eq: ${body.id}}}) {
//         affected_rows
//       }
//     }
//   `
//   await graphqlAxiosInstance.post("", { query })
//   return reply.send({ message: "正常に削除されました。" })
// })
// // ログイン
// app.post("/login", async (request, reply) => {
//   const body = request.body as User
//   const query = `
//     query {
//       ${TABLE_NAME}(
//         where: {
//           _or: [
//             {username: {_eq: "${body.usernameOrEmail}"}},
//             {email: {_eq: "${body.usernameOrEmail}"}}
//           ]
//           password: {_eq: "${body.password}"}
//         }
//       ) {
//         id
//         username
//         email
//         password
//       }
//     }
//   `
//   const { data } = await graphqlAxiosInstance.post("", {
//     query,
//   })
//   if (!data || Object.keys(data.data.users_users).length === 0) {
//     return reply.status(404).send({ message: "ユーザーが見つかりません" })
//   }
//   return reply.send(data.data)
// })
