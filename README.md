# Spotify Playlist Generator

A Next.js application using the Spotify Web API to search tracks and generate playlists in the user account.

## Demo

Use the app online at [https://spotify-playlist-generator-flax.vercel.app](https://spotify-playlist-generator-flax.vercel.app)

![Application Demo](demo.gif)

## Run the Project Locally

- Clone this repository
- Run `npm install`
- Go to the [Spotify Web API Dashboard](https://developer.spotify.com/dashboard/login)
- Login and create an app
- Open the app settings and at Redirect URIs field add `http://localhost:3000/api/auth/callback/spotify`
- Create a `.env.local` file on the project root with the following values:

  ```bash
  NEXT_PUBLIC_CLIENT_ID=[YOUR SPOTIFY APP CLIENT ID]    
  NEXT_PUBLIC_CLIENT_SECRET=[YOUR SPOTIFY APP CLIENT SECRET]
  ```
- Run `npm run dev` and open [http://localhost:3000](http://localhost:3000) with your browser.

## Technologies Used

- [Next.js](https://nextjs.org) for SSR (Server Side Rendering)
- [NextAuth.js](https://next-auth.js.org) for User Authentication
- [ChakraUI](https://chakra-ui.com) for User Interface

## APIs Used

- [Spotify Web API](https://developer.spotify.com/documentation/web-api/) for searching tracks and creating playlists.