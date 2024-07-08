import {
  Button,
  Container,
  HStack,
  Heading,
  VStack,
  Text,
  Card,
  CardBody,
} from "@chakra-ui/react";
import Link from "next/link";
import { getUsers } from "../actions/users";
import { DeleteUserButton } from "../components/delete-user-button";

export default async function Home() {
  const users = await getUsers();
  const isEmpty = users.length === 0;
  return (
    <main>
      <Container pt={10}>
        <VStack align={"flex-start"} w="100%" spacing={4}>
          <HStack w="100%" justify={"space-between"} align={"center"} mb={4}>
            <Heading>Usuários</Heading>
            <Link href="/create-user">
              <Button size="sm">Criar usuário</Button>
            </Link>
          </HStack>
          {isEmpty && (
            <VStack w="100%">
              <Card variant={"filled"} w="100%">
                <CardBody>
                  <Text>Nenhum usuário encontrado.</Text>
                </CardBody>
              </Card>
            </VStack>
          )}
          {users.map((user) => (
            <Card variant="filled" w="100%" key={user.id}>
              <CardBody>
                <HStack justify="space-between">
                  <VStack align={"flex-start"}>
                    <Text fontWeight={"bold"}>{user.name}</Text>
                    <Text>{user.email}</Text>
                  </VStack>
                  <DeleteUserButton userId={user.id} />
                </HStack>
              </CardBody>
            </Card>
          ))}
        </VStack>
      </Container>
    </main>
  );
}
