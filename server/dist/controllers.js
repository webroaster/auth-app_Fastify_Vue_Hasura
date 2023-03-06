"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginController = exports.deleteUserController = exports.updateUserController = exports.createUserController = exports.getUserController = void 0;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const TABLE_NAME = process.env.TABLE_NAME;
const graphqlAxiosInstance = axios_1.default.create({
    baseURL: process.env.GRAPHQL_URL,
});
// ユーザー情報取得
exports.getUserController = {
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
        const { data } = await graphqlAxiosInstance.post("", { query });
        return reply.send(data.data);
    },
};
// // ユーザー登録
exports.createUserController = {
    handler: async (request, reply) => {
        const body = request.body;
        const query = `
      mutation {
        insert_${TABLE_NAME} (objects: [{
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
    `;
        const { data } = await graphqlAxiosInstance.post("", { query });
        return reply.send(data.data);
    },
};
// // ユーザー更新
exports.updateUserController = {
    handler: async (request, reply) => {
        const body = request.body;
        const query = `
      mutation {
        update_${TABLE_NAME}(
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
    `;
        const { data } = await graphqlAxiosInstance.post("", {
            query,
        });
        return reply.send(data.data);
    },
};
// // ユーザー削除
exports.deleteUserController = {
    handler: async (request, reply) => {
        const body = request.body;
        const query = `
      mutation {
        delete_${TABLE_NAME}(where: {id: {_eq: ${body.id}}}) {
          affected_rows
        }
      }
    `;
        await graphqlAxiosInstance.post("", { query });
        return reply.send({ message: "正常に削除されました。" });
    },
};
// // ログイン
exports.loginController = {
    handler: async (request, reply) => {
        const body = request.body;
        const query = `
      query {
        ${TABLE_NAME}(
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
    `;
        const { data } = await graphqlAxiosInstance.post("", {
            query,
        });
        if (!data || Object.keys(data.data.users_users).length === 0) {
            return reply.status(404).send({ message: "ユーザーが見つかりません" });
        }
        return reply.send(data.data);
    },
};
