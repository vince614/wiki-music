import { SpotifyApi } from "@spotify/web-api-ts-sdk";
import { Page, SimplifiedPlaylist } from "@spotify/web-api-ts-sdk/src/types";

const spotifySearchApiUri = "https://api.spotify.com/v1/search";

const api = SpotifyApi.withClientCredentials(
  process.env.AUTH_SPOTIFY_ID as string,
  process.env.AUTH_SPOTIFY_SECRET as string,
);

export async function searchSong(query: string) {
  return await api.search(query, ["track"]);
}

export async function getUserPlaylists(
  accessToken: string,
): Promise<Page<SimplifiedPlaylist>> {
  const data = await fetch(`${spotifySearchApiUri}/me/playlists`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return data.json();
}
