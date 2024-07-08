"use server";

import { revalidatePath } from "next/cache";
import { User } from "../types";

const usersUrl = process.env.USER_SERVICE_URL + "/users";
const userUrl = (userId: string) => usersUrl + "/" + userId;

export const getUsers = async () => {
  const response = await fetch(usersUrl, { cache: "no-store" });
  const data = await response.json();
  return data.users as User[];
};

export const getUser = async (userId: string) => {
  const response = await fetch(userUrl(userId), { cache: "no-store" });
  return (await response.json()) as User;
};

export const deleteUser = async (userId: string) => {
  const res = await fetch(userUrl(userId), { method: "DELETE" });
  if (!res.ok) {
    throw new Error("Failed to delete user");
  }
  revalidatePath(usersUrl);
};

export const createUser = async (
  _: any,
  formData: FormData
): Promise<FormState<User>> => {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;

  const response = await fetch(usersUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email }),
  });

  if (!response.ok) {
    return {
      status: "error",
      message: "Usuário criado com sucesso",
      error: response.json(),
    } as const;
  }

  const user = await response.json();
  revalidatePath(usersUrl);

  return {
    status: "success",
    message: "Usuário criado com sucesso",
    data: user,
  } as const;
};

export const updateUser = async (
  userId: string,
  _: any,
  formData: FormData
): Promise<FormState<User>> => {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;

  const url = userUrl(userId);
  const response = await fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email }),
  });

  if (!response.ok) {
    return {
      status: "error",
      message: "Error ao atualizar usuário",
      error: response.json(),
    } as const;
  }

  const user = await response.json();
  revalidatePath(url);
  revalidatePath(usersUrl);

  return {
    status: "success",
    message: "Usuário salvo com sucesso",
    data: user,
  } as const;
};
