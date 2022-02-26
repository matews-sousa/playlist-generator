import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Input,
  Text,
  Link as StyledLink,
  Spinner,
  Image,
  Center,
  FormLabel,
  FormControl,
} from "@chakra-ui/react";
import useSpotify from "../hooks/useSpotify";
import Link from "next/link";

const Search = () => {
  const spotify = useSpotify();
  const [items, setItems] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const delayDebounceFn = setTimeout(() => {
      if (searchValue) {
        spotify
          .searchTracks(searchValue, { limit: 10, offset: 0 })
          .then((res) => {
            setItems(res.body.tracks.items);
            setLoading(false);
          });
      } else {
        setItems([]);
      }
    }, 1500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchValue]);

  return (
    <Box>
      <FormControl>
        <FormLabel size="lg">Search for a song</FormLabel>
        <Input onChange={(e) => setSearchValue(e.target.value)} />
        {searchValue && (
          <Box top="10" bgColor="white" w="full" boxShadow="2xl">
            {loading ? (
              <Center>
                <Spinner size="xl" my={10} />
              </Center>
            ) : (
              items?.map((item) => (
                <Link href={`/${item.id}`} key={item.id}>
                  <StyledLink>
                    <Flex
                      w="100%"
                      alignItems="center"
                      cursor="pointer"
                      p={4}
                      css={{
                        "&:hover": {
                          backgroundColor: "lightgray",
                        },
                      }}
                    >
                      <Image src={item.album.images[0].url} w={16} />
                      <Text ml={2}>
                        {item.name}, {item.artists[0].name}
                      </Text>
                    </Flex>
                  </StyledLink>
                </Link>
              ))
            )}
          </Box>
        )}
      </FormControl>
    </Box>
  );
};

export default Search;
