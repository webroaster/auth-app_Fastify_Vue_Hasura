import axios from "axios";
// import { getUserController } from "./controllers"
const TABLE_NAME = process.env.TABLE_NAME;
const graphqlAxiosInstance = axios.create({
    baseURL: process.env.GRAPHQL_URL,
});
const routes = async (app) => {
    // app.get("/users", getUserController)
    app.get("/users", async (_, reply) => {
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
    });
    // app.post("/create", createUserController)
    // app.post("/update", updateUserController)
    // app.post("/delete", deleteUserController)
    // app.post("/login", loginController)
};
export default routes;
