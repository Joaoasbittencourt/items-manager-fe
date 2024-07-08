"use server";
import { Container, Heading, VStack } from "@chakra-ui/react";

import { getUser } from "../../../actions/users";
import { NextPageContext } from "next";
import { UpdateUserForm } from "../../../components/update-user-form";

const UpdateUserPage = async ({ params }: { params: { id: string } }) => {
  const user = await getUser(params.id);

  return (
    <Container pt={10}>
      <VStack align="flex-start" spacing={4}>
        <Heading size={"lg"}>Editar {user.name}</Heading>
        <UpdateUserForm userId={params.id} initialValues={user} />
      </VStack>
    </Container>
  );
};

export default UpdateUserPage;
