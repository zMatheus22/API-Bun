import express from "express";
import {
  createUserController,
  findOneUserController,
  listUserController,
} from "@/controller/user.controller";
import { createTodoController } from "./controller/todo.controller";

const PORT = 3000;
const app = express();
app.use(express.json());

// /user
//    GET
app.get("/", () => "Olá Mundo!");
app.get("/user", listUserController);
app.get("/user/:userId", findOneUserController);

//    POST
app.post("/user", createUserController);

// /todos
//    POST
app.post("/todos", createTodoController);

app.listen(PORT);
console.log(`Running at ${PORT}`);
