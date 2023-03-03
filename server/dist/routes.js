import { getUserController, createUserController, updateUserController, deleteUserController, loginController, } from "./controllers.js";
const routes = async (app) => {
    app.get("/users", getUserController);
    app.post("/create", createUserController);
    app.post("/update", updateUserController);
    app.post("/delete", deleteUserController);
    app.post("/login", loginController);
};
export default routes;
