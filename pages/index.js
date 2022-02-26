import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { useSession, signIn, signOut } from "next-auth/react";
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

  useEffect(() => {
    if (session?.user?.accessToken) {
      spotify.getMyTopTracks().then((res) => setTopTracks(res.body.items));
      spotify.getMyTopArtists().then((res) => setTopArtists(res.body.items));
    }
  }, [session]);

  if (!session) {
    return (
      <>
        Not signed in <br />
        <button onClick={() => signIn()}>Sign in</button>
      </>
    );
  }

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
      <Flex flexWrap="wrap" justifyContent="center" mt={10}>
        <Box maxW="500px">
          <Heading as="h3" size="lg">
            Top Artists
          </Heading>
          <Flex maxW="500px" flexWrap="wrap">
            {topArtists.map((artist) => (
              <Artist artist={artist} key={artist.name} />
            ))}
          </Flex>
        </Box>
        <Box maxW="500px">
          <Heading as="h3" size="lg">
            Top Tracks
          </Heading>
          {topTracks.map((track) => (
            <Track track={track} key={track.name} select={setTrackPlaying} />
          ))}
        </Box>
      </Flex>
      <Player token={session?.user?.accessToken} trackUri={trackPlaying} />
    </Layout>
  );
}

Home.auth = true;
