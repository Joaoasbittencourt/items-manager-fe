import { User } from "../types";

const usersUrl = process.env.USER_SERVICE_URL + "/users";

export const getUsers = async () => {
  const response = await fetch(usersUrl, { cache: "no-store" });
  const data = await response.json();
  return data.users as User[];
};
