import { FastifyInstance } from "fastify"
import {
  getUserController,
  createUserController,
  updateUserController,
  deleteUserController,
  loginController,
} from "./controllers"

const routes = async (app: FastifyInstance) => {
  app.get("/users", getUserController)

  app.post("/create", createUserController)

  app.post("/update", updateUserController)

  app.post("/delete", deleteUserController)

  app.post("/login", loginController)
}

export default routes
