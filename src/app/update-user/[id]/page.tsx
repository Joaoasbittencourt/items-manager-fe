"use server";
import { Container, Heading, VStack } from "@chakra-ui/react";
import { getUser } from "../../../actions/users";
import { UpdateUserForm } from "../../../components/update-user-form";

const UpdateUserPage = async ({ params }: { params: { id: string } }) => {
  const user = await getUser(params.id);

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
        <Heading size={"lg"}>Editar {user.name}</Heading>
        <UpdateUserForm userId={params.id} initialValues={user} />
      </VStack>
    </Container>
  );
};

export default UpdateUserPage;
