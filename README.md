# Spotify Playlist Generator

A Next.js application using the Spotify Web API to search tracks and generate playlists in the user account.

## Demo


Use the app online at [https://playlist-generator-three.vercel.app](https://playlist-generator-three.vercel.app)

![Application Demo](demo.gif)

## Features

- Users can view their top Artists and Tracks
- Play and pause tracks in the browser
- Search for a track by name
- Generate a playlist based in the track selected
- Remove tracks from the playlist generated
- Create and save the playlist in the Spotify account

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
  JWT_SECRET=[CREATE A JWT SECRET]
  ```
- Run `npm run dev` and open [http://localhost:3000](http://localhost:3000) with your browser.

## Stack Used

- [Next.js](https://nextjs.org) for SSR (Server Side Rendering)
- [NextAuth.js](https://next-auth.js.org) for User Authentication
- [ChakraUI](https://chakra-ui.com) for User Interface

## APIs Used

- [Spotify Web API](https://developer.spotify.com/documentation/web-api/) for searching tracks and creating playlists.