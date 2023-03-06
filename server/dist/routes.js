"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controllers_1 = require("./controllers");
const routes = async (app) => {
    app.get("/users", controllers_1.getUserController);
    app.post("/create", controllers_1.createUserController);
    app.post("/update", controllers_1.updateUserController);
    app.post("/delete", controllers_1.deleteUserController);
    app.post("/login", controllers_1.loginController);
};
exports.default = routes;
