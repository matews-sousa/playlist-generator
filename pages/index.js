import {
  Button,
  Center,
  Flex,
  Heading,
  SimpleGrid,
  Spinner,
} from "@chakra-ui/react";
import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import Artist from "../components/Artist";
import Layout from "../components/Layout";
import Player from "../components/Player";
import Search from "../components/Search";
import Track from "../components/Track";
import useSpotify from "../hooks/useSpotify";

export default function Home() {
  const { data: session } = useSession();
  const spotify = useSpotify();
  const [topTracks, setTopTracks] = useState([]);
  const [topArtists, setTopArtists] = useState([]);
  const [trackPlaying, setTrackPlaying] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopTracksAndArtists = async () => {
      if (session?.accessToken) {
        const topTracksRes = await spotify.getMyTopTracks();
        setTopTracks(topTracksRes.body.items);
        const topArtistsRes = await spotify.getMyTopArtists();
        setTopArtists(topArtistsRes.body.items);
      }
      setLoading(false);
    };
    fetchTopTracksAndArtists();
  }, [session]);

  return (
    <Layout>
      <Flex justifyContent="space-between" alignItems="center" py={2} mb={10}>
        <Heading size="lg" as="h1">
          Hello, {session?.user?.name}
        </Heading>
        <Button onClick={() => signOut()} colorScheme="red">
          Sign out
        </Button>
      </Flex>
      <Search />
      <SimpleGrid columns={[1, 1, 1, 2]} spacing={10} mt={6}>
        <Flex flexDir="column" alignItems="center">
          <Heading as="h3" size="lg">
            Top Artists
          </Heading>
          <Flex flexWrap="wrap">
            <SimpleGrid minChildWidth="130px">
              {!loading ? (
                topArtists.map((artist) => (
                  <Artist artist={artist} key={artist.name} />
                ))
              ) : (
                <Center mt={10}>
                  <Spinner size="xl" />
                </Center>
              )}
            </SimpleGrid>
          </Flex>
        </Flex>
        <Flex flexDir="column" alignItems="center">
          <Heading as="h3" size="lg">
            Top Tracks
          </Heading>
          {!loading ? (
            topTracks.map((track) => (
              <Track track={track} key={track.name} select={setTrackPlaying} />
            ))
          ) : (
            <Center mt={10}>
              <Spinner size="xl" />
            </Center>
          )}
        </Flex>
      </SimpleGrid>
      <Player token={session?.accessToken} trackUri={trackPlaying} />
    </Layout>
  );
}

Home.auth = true;
