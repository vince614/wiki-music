"use server";

import { MaxInt, SpotifyApi } from "@spotify/web-api-ts-sdk";

import { formatDuration } from "@/lib/utils";
import { SearchResultInterface } from "@/types/interface";

const api = SpotifyApi.withClientCredentials(
  process.env.AUTH_SPOTIFY_ID as string,
  process.env.AUTH_SPOTIFY_SECRET as string,
);

export async function searchSpotify(
  query: string,
  limit: MaxInt<50> = 20,
): Promise<SearchResultInterface> {
  const data = await api.search(
    query,
    ["track", "artist", "album"],
    undefined,
    limit,
  );

  const songs = data.tracks.items.map((item) => {
    return {
      name: item.name,
      artist: item.artists[0].name,
      album: item.album.name,
      image: item.album.images[0].url,
      duration: formatDuration(item.duration_ms), // Convert to 3:23
    };
  });

  const albums = data.albums.items.map((item) => {
    return {
      name: item.name,
      artist: item.artists[0].name,
      image: item.images[0].url,
      release_date: item.release_date,
    };
  });

  const artists = data.artists.items.map((item) => {
    return {
      name: item.name,
      image: item.images[0]?.url,
    };
  });

  return { songs, albums, artists };
}
