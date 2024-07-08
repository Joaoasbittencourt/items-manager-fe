"use client";

import {
  Alert,
  AlertDescription,
  AlertIcon,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import { redirect } from "next/navigation";
import { useFormState, useFormStatus } from "react-dom";
import { useEffect } from "react";
import { createUser } from "./actions";

const CreateUserPage = () => {
  const [state, formAction] = useFormState(createUser, {
    status: "initial",
  });

  useEffect(() => {
    if (state.status === "success") {
      redirect("/");
    }
  }, [state.status]);

  return (
    <Container pt={10}>
      <VStack align="flex-start" spacing={4}>
        <Heading size={"lg"}>Novo Usuário</Heading>
        <VStack as="form" w={"100%"} action={formAction}>
          <FormControl>
            <FormLabel>Nome</FormLabel>
            <Input name="name" type="text" required placeholder="John Doe" />
          </FormControl>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              name="email"
              type="email"
              required
              placeholder="johndoe@mail.com"
            />
          </FormControl>
          <SubmitButton />
          {state.status === "error" && (
            <Alert status="error">
              <AlertIcon />
              There was an error processing your request
              <AlertDescription maxWidth="sm">{state.message}</AlertDescription>
            </Alert>
          )}
        </VStack>
      </VStack>
    </Container>
  );
};

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button w="100%" isLoading={pending} colorScheme="blue" type="submit">
      Criar
    </Button>
  );
};

export default CreateUserPage;
