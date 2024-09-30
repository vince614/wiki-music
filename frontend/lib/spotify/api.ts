const spotifySearchApiUri = "https://api.spotify.com/v1/search";

export async function searchSong(accessToken: string, query: string) {
  const data = await fetch(`${spotifySearchApiUri}?q=${query}&type=track`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const songs = await data.json();

  return songs.tracks.items;
}

export async function searchAlbum(accessToken: string, query: string) {
  const data = await fetch(`${spotifySearchApiUri}?q=${query}&type=album`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const albums = await data.json();

  return albums.albums.items;
}

export async function searchArtist(accessToken: string, query: string) {
  const data = await fetch(`${spotifySearchApiUri}?q=${query}&type=artist`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const artists = await data.json();

  return artists.artists.items;
}
