"use server";

import { revalidatePath } from "next/cache";

const usersUrl = process.env.USER_SERVICE_URL + "/users";

type User = {
  id: string;
  name: string;
  email: string;
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
