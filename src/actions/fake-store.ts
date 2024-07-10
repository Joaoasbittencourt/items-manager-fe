"use server";

import { User } from "../types";
import { createUser } from "./users";

type FakeStoreUser = {
  id: number;
  address: {
    geolocation: {
      lat: string;
      long: string;
    };
    city: string;
    street: string;
    number: number;
    zipcode: string;
  };
  email: string;
  username: string;
  password: string;
  phone: string;
  name: {
    firstname: string;
    lastname: string;
  };
};

const usersUrl = process.env.FAKE_STORE_SERVICE_URL + "/users";
const userByUsernameUrl = (username: string) => usersUrl + "/" + username;

export const importUser = async (
  _: FormState<User>,
  data: FormData
): Promise<FormState<User>> => {
  const username = data.get("username") as string;
  const url = userByUsernameUrl(username);
  const response = await fetch(url, { cache: "no-store" });

  if (response.status === 404) {
    return {
      status: "error",
      message: "Usuário não foi encontrado",
    };
  }

  const fakeStoreUser = (await response.json()) as FakeStoreUser;
  console.log(fakeStoreUser);
  const createUserRes = await createUser({
    name: fakeStoreUser.name.firstname + " " + fakeStoreUser.name.lastname,
    email: fakeStoreUser.email,
  });

  if (!createUserRes.ok) {
    return {
      status: "error",
      message: "Erro ao importar usuário",
    };
  }

  return {
    status: "success",
    message: "Usuário importado com sucesso",
    data: (await createUserRes.json()) as User,
  };
};
