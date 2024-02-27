import { prisma } from "@/lib/prisma";
import type { Request, Response } from "express";

export const createTodoController = async (
  request: Request,
  response: Response
) => {
  const userId = request.headers["x-user-id"];

  if (!userId) {
    return response.status(403).send({ error: "Usuário não autorizado!" });
  }

  const user = await prisma.user.findUnique({
    where: { id: userId as string },
  });

  if (!user) {
    return response.status(403).send({ error: "Usuário não autorizado!" });
  }

  const { title } = request.body;
  const todo = await prisma.todo.create({
    data: { title: title, ownerId: user.id },
  });

  return response.status(201).send(todo);
};
