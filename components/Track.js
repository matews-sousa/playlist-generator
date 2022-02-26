import { Flex, Heading, IconButton, Image, Text } from "@chakra-ui/react";
import { BsFillPlayFill, BsTrashFill } from "react-icons/bs";

const Track = ({ track, select, deleteTrack }) => {
  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      maxW="500px"
      my={2}
      bgColor="blue.100"
      p={1}
      rounded="md"
      css={{
        "&:hover": {
          backgroundColor: "lightsteelblue",
        },
      }}
    >
      <Flex alignItems="center">
        <Image src={track?.album?.images[0].url} w="14" />
        <Flex flexDir="column" ml={2}>
          <Heading size="sm" as="h3">
            {track?.name}
          </Heading>
          <Text>{track?.artists[0].name}</Text>
        </Flex>
      </Flex>
      <Flex>
        <IconButton
          aria-label="Play Preview"
          icon={<BsFillPlayFill />}
          rounded="full"
          fontSize={22}
          colorScheme="teal"
          onClick={() => select(track?.uri)}
        />
        {deleteTrack && (
          <IconButton
            aria-label="Play Preview"
            icon={<BsTrashFill />}
            rounded="full"
            fontSize={22}
            colorScheme="red"
            onClick={() => deleteTrack(track?.id)}
            ml={2}
          />
        )}
      </Flex>
    </Flex>
  );
};

export default Track;
