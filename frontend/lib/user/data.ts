"use server";

import { Get, Post } from "@/lib/api";
import { UserFormInterface } from "@/types/interface";
import {
  getUserAlbums,
  getUserFollowedArtists,
  getUserPlaylists,
} from "@/lib/spotify/user";

export const fetchAllUsers = async () => {
  return await Get("/users");
};

export const upsertUser = async (data: UserFormInterface) => {
  return await Post("/users/upsert", data);
};

export const syncUserData = async (accessToken: string, identifier: string) => {
  const playlists = await getUserPlaylists(accessToken);
  const albums = await getUserAlbums(accessToken);
  const artists = await getUserFollowedArtists(accessToken);

  const result = await Post("/users/sync", {
    userId: identifier,
    playlists: playlists,
    albums: albums,
    artists: artists,
  });

  console.log(result);
};
