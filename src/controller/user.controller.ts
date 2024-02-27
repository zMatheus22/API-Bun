import { request, response, type Request, type Response } from "express";
import { prisma } from "@/lib/prisma";

export const listUserController = async (
  request: Request,
  response: Response
) => {
  const user = await prisma.user.findMany();

  response.send(user);
};

export const findOneUserController = async (
  request: Request,
  response: Response
) => {
  const { userId } = request.params;

  const user = await prisma.user.findFirst({
    where: { id: userId },
  });

  if (!userId) {
    return response.status(404).send({ error: "Usuário não encontrado!" });
  }
  response.send(user);
};

export const createUserController = async (
  request: Request,
  response: Response
) => {
  const { name, email } = request.body;

  if (!name || !email) {
    return response.status(400).send({ error: "Nome ou Email inválido" });
  }

  const userEmailAlreadyExist = await prisma.user.findFirst({
    where: { email },
    select: {
      id: true,
    },
  });

  if (userEmailAlreadyExist) {
    return response.status(400).send({ error: "Email já usado" });
  }

  const user = await prisma.user.create({ data: { name, email } });

  return response.status(200).send("Usuário cadastrado com sucesso!");
};
