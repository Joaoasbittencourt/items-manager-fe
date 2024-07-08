"use client";

import { Button } from "@chakra-ui/react";
import { useTransition } from "react";
import { deleteUser } from "../actions/users";

export const DeleteUserButton = ({ userId }: { userId: string }) => {
  const [isPending, start] = useTransition();
  return (
    <Button
      size={"sm"}
      isLoading={isPending}
      onClick={() => start(() => deleteUser(userId))}
    >
      Delete
    </Button>
  );
};
