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
import { getUsers } from "./actions";

export default async function Home() {
  const users = await getUsers();
  const isEmpty = users.length === 0;
  return (
    <main>
      <Container pt={10}>
        <VStack align={"flex-start"} w="100%" spacing={4}>
          <HStack w="100%" justify={"space-between"}>
            <Heading>Usuários</Heading>
            <Link href="/create-user">
              <Button size="sm">Criar usuário</Button>
            </Link>
          </HStack>
          {isEmpty && (
            <VStack w="100%">
              <Text>Nenhum usuário encontrado.</Text>
              <Button colorScheme="blue">Criar primeiro usuário </Button>
            </VStack>
          )}
          {users.map((user) => (
            <Card variant="filled" w="100%" key={user.id}>
              <CardBody>
                <Text>{user.name}</Text>
                <Text>{user.email}</Text>
              </CardBody>
            </Card>
          ))}
        </VStack>
      </Container>
    </main>
  );
}
