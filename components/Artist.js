import { Box, Image, Text } from "@chakra-ui/react";
import React from "react";

const Artist = ({ artist }) => {
  return (
    <Box w="100px" m={2}>
      <Image src={artist.images[0].url} w="100%" />
      <Text>{artist.name}</Text>
    </Box>
  );
};

export default Artist;
