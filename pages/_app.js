import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider, signIn, useSession } from "next-auth/react";
import { useEffect } from "react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <ChakraProvider>
        {Component.auth ? (
          <Auth>
            <Component {...pageProps} />
          </Auth>
        ) : (
          <Component {...pageProps} />
        )}
      </ChakraProvider>
    </SessionProvider>
  );
}

function Auth({ children }) {
  const { data: session, status } = useSession();
  const isUser = !!session?.user;
  useEffect(() => {
    if (status === "loading") return;
    if (!isUser) signIn();
  }, [isUser, status]);

  if (isUser) {
    return children;
  }

  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  return <div>Loading...</div>;
}
