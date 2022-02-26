import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Button,
  Center,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import useSpotify from "../hooks/useSpotify";
import NextLink from "next/link";

const CreatePlaylistForm = ({ playlist }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const spotify = useSpotify();
  const playlistUris = playlist.map((track) => track.uri);
  const [visibility, setVisibility] = useState("private");
  const [playlistTitle, setPlaylistTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [playlistURL, setPlaylistURL] = useState("");

  const createPlaylist = () => {
    setLoading(true);
    spotify
      .createPlaylist(playlistTitle, { public: visibility === "public" })
      .then((res) => {
        setPlaylistURL(res.body.external_urls.spotify);
        console.log(res.body);
        spotify
          .addTracksToPlaylist(res.body.id, playlistUris)
          .then(() => setLoading(false));
      });
  };

  return (
    <>
      <Button onClick={onOpen} colorScheme="green">
        Create Playlist
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {!loading && playlistURL ? "Playlist Created" : "Playlist Details"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {!loading && playlistURL ? (
              <Center>
                <Link href={playlistURL} isExternal color="green.500">
                  Check your Spotify library <ExternalLinkIcon />
                </Link>
              </Center>
            ) : (
              <>
                <FormControl>
                  <FormLabel>Playlist Title</FormLabel>
                  <Input
                    value={playlistTitle}
                    onChange={(e) => setPlaylistTitle(e.target.value)}
                    placeholder="My Playlist"
                  />
                </FormControl>
                <RadioGroup onChange={setVisibility} value={visibility} my={2}>
                  <FormLabel>Playlist Visibility</FormLabel>
                  <HStack spacing={5}>
                    <Radio value="public" size="lg">
                      Public
                    </Radio>
                    <Radio value="private" size="lg">
                      Private
                    </Radio>
                  </HStack>
                </RadioGroup>
              </>
            )}
          </ModalBody>
          <ModalFooter>
            {!loading && playlistURL ? (
              <Button mr={3} colorScheme="green">
                <NextLink href="/">
                  <a>Back Home</a>
                </NextLink>
              </Button>
            ) : (
              <Button
                colorScheme="green"
                mr={3}
                onClick={createPlaylist}
                isLoading={loading}
              >
                Save on Spotify
              </Button>
            )}
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreatePlaylistForm;
