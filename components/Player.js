import { Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import SpotifyPlayer from "react-spotify-web-playback";

const Player = ({ trackUri, token }) => {
  const [play, setPlay] = useState(false);

  useEffect(() => setPlay(true), [trackUri]);

  if (!token) return null;

  return (
    <Box position="fixed" bottom={0} w="100%" insetX={0}>
      {trackUri && (
        <SpotifyPlayer
          showSaveIcon
          token={token}
          uris={trackUri ? [trackUri] : []}
          play={play}
          callback={(state) => {
            if (!state.isPlaying) setPlay(false);
          }}
          styles={{
            activeColor: "#1cb954",
            bgColor: "#333",
            color: "#fff",
            loaderColor: "#fff",
            sliderColor: "#1cb954",
            trackArtistColor: "#ccc",
            trackNameColor: "#fff",
          }}
        />
      )}
    </Box>
  );
};

export default Player;
