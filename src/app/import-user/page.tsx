"use client";

import {
  Alert,
  AlertDescription,
  AlertIcon,
  Button,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useFormState, useFormStatus } from "react-dom";
import { useEffect } from "react";
import { importUser } from "../../actions/fake-store";

const ImportUserPage = ({ params: {} }) => {
  const router = useRouter();
  const [state, formAction] = useFormState(importUser, {
    status: "initial",
  });

  useEffect(() => {
    if (state.status === "success") {
      router.replace("/");
    }
  }, [state.status, router]);

  return (
    <Container
      borderColor={"gray.100"}
      borderWidth={"1px"}
      bgColor="gray.50"
      p={10}
      mt={10}
      borderRadius={"md"}
    >
      <VStack align="flex-start" spacing={4}>
        <Heading size={"lg"}>Importar Usuário da Fake Store</Heading>
        <VStack as="form" w={"100%"} action={formAction}>
          <FormControl>
            <FormLabel>Nome de usuário</FormLabel>
            <Input
              name="username"
              type="text"
              required
              placeholder="John Doe"
            />
            <FormHelperText>Usuário da FakeStore API</FormHelperText>
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
            <Alert borderRadius={"md"} status="error">
              <AlertIcon />
              <VStack>
                Um error ocorreu ao importar o usuário.
                <AlertDescription maxWidth="sm">
                  {state.message}
                </AlertDescription>
              </VStack>
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
    <Button isLoading={pending} type="submit">
      Importar
    </Button>
  );
};

export default ImportUserPage;
