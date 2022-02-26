import React from "react";
import { getProviders, signIn, getSession } from "next-auth/react";
import { Box, Button, Center } from "@chakra-ui/react";
import Head from "next/head";

const LoginPage = ({ providers }) => {
  return (
    <Center h="100vh">
      <Head>
        <title>Sign In with Spotify</title>
      </Head>
      {Object.values(providers).map((provider) => (
        <Box key={provider.name}>
          <Button
            colorScheme="green"
            onClick={() => signIn(provider.id, { callbackUrl: "/" })}
          >
            Sign In with {provider.name}
          </Button>
        </Box>
      ))}
    </Center>
  );
};

export default LoginPage;

export const getServerSideProps = async (context) => {
  const providers = await getProviders();
  const session = await getSession(context);

  if (session?.user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      providers,
    },
  };
};
