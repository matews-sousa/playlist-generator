import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";
import spotifyApi from "../lib/spotify";

function useSpotify() {
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      if (session.error === "RefreshAccessTokenError") {
        signIn();
      }
      spotifyApi.setAccessToken(session.accessToken);
    }
  }, [session]);

  return spotifyApi;
}

export default useSpotify;
