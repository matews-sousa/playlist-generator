import { Box, Heading, IconButton, Image, Spinner } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Layout from "../components/Layout";
import Player from "../components/Player";
import Track from "../components/Track";
import useSpotify from "../hooks/useSpotify";
import generatePlaylist from "../utils/generatePlaylist";

const GeneratePlaylistPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: session } = useSession();
  const spotify = useSpotify();
  const [currentTrack, setCurrentTrack] = useState(null);
  const [playlist, setPlaylist] = useState([]);
  const [trackPlaying, setTrackPlaying] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session) {
      spotify.getTrack(id).then(async (res) => {
        console.log(res.body);
        setCurrentTrack(res.body);
        const playlistGenerated = await generatePlaylist(
          spotify,
          res.body.artists[0].id
        );
        setPlaylist(playlistGenerated);
        setLoading(false);
      });
    }
  }, [session]);

  const deleteTrack = (id) => {
    const filtered = playlist.filter((track) => track.id !== id);

    setPlaylist(filtered);
  };

  if (!session) {
    return router.push("/api/auth/login");
  }

  return (
    <Layout>
      <Box maxW="500px" position="relative">
        <IconButton
          icon={<AiOutlineClose />}
          position="absolute"
          onClick={() => router.back()}
          roundedLeft="none"
          top={2}
          aria-label="Cancel Creation"
        />
        <Image
          src={currentTrack?.album?.images[0].url}
          w="100%"
          maxH={300}
          objectFit="cover"
        />
        <Heading>{currentTrack?.name}</Heading>
      </Box>
      <Box maxW="500px" mt={10}>
        {loading ? (
          <Spinner />
        ) : (
          playlist?.map((track) => (
            <Track
              track={track}
              key={track.id}
              select={setTrackPlaying}
              deleteTrack={deleteTrack}
            />
          ))
        )}
      </Box>

      <Player token={session?.user?.accessToken} trackUri={trackPlaying} />
    </Layout>
  );
};

GeneratePlaylistPage.auth = true;

export default GeneratePlaylistPage;
