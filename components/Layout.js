import { Box } from "@chakra-ui/react";
import Head from "next/head";
import React from "react";

const Layout = ({ children }) => {
  return (
    <Box>
      <Head>
        <title>Playlist Generator</title>
      </Head>

      <Box w="80vw" mx="auto" pb={24} as="main">
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
