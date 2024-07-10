"use client";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  VStack,
} from "@chakra-ui/react";
import { redirect } from "next/navigation";
import { useFormState, useFormStatus } from "react-dom";
import { useEffect } from "react";
import { updateUser } from "../actions/users";
import { useRouter } from "next/navigation";

type UpdateUserFormProps = {
  userId: string;
  initialValues: {
    name: string;
    email: string;
  };
};

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button isLoading={pending} type="submit">
      Salvar
    </Button>
  );
};

export const UpdateUserForm = (props: UpdateUserFormProps) => {
  const router = useRouter();
  const updateWithId = updateUser.bind(null, props.userId);
  const [state, formAction] = useFormState(updateWithId, {
    status: "initial",
  });

  useEffect(() => {
    if (state.status === "success") {
      redirect("/");
    }
  }, [state.status]);

  return (
    <VStack as="form" w={"100%"} action={formAction}>
      <FormControl>
        <FormLabel>Nome</FormLabel>
        <Input
          defaultValue={props.initialValues.name}
          name="name"
          type="text"
          required
          placeholder="John Doe"
        />
      </FormControl>
      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input
          defaultValue={props.initialValues.email}
          name="email"
          type="email"
          required
          placeholder="johndoe@mail.com"
        />
      </FormControl>
      <HStack w="100%" mt={4}>
        <SubmitButton />
        <Button
          onClick={() => router.push("/")}
          variant={"ghost"}
          colorScheme="red"
        >
          Cancelar
        </Button>
      </HStack>
      {state.status === "error" && (
        <Alert status="error">
          <AlertIcon />
          <AlertDescription maxWidth="sm">{state.message}</AlertDescription>
        </Alert>
      )}
    </VStack>
  );
};
