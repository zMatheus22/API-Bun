import { Elysia } from "elysia";

const PORT = 3000;

const app = new Elysia().get("/", () => "Olá Mundo!").listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
