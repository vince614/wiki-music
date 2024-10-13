import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

import {
  checkAccessToken,
  getUserAlbums,
  getUserFollowedArtists,
  getUserPlaylists,
} from "@/lib/spotify/user";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const data = await req.json();

  // Check if the request has the required data
  if (!data.accessToken || !data.identifier) {
    return NextResponse.json({
      message: "Invalid request",
      code: 400,
    });
  }

  // Check if the access token is valid
  const access = await checkAccessToken(data.accessToken);

  if (!access) {
    return NextResponse.json({
      error: "Invalid access token",
      code: 401,
    });
  }

  const playlists = await getUserPlaylists(data.accessToken);
  const albums = await getUserAlbums(data.accessToken);
  const artists = await getUserFollowedArtists(data.accessToken);

  try {
    for (const playlist of playlists) {
      await prisma.playlist.upsert({
        where: {
          identifier: playlist.id,
        },
        update: {
          name: playlist.name,
          description: playlist.description,
          imageUri: playlist.images[0].url,
          public: playlist.public,
        },
        create: {
          identifier: playlist.id,
          name: playlist.name,
          description: playlist.description,
          imageUri: playlist.images[0].url,
          public: playlist.public,
          href: playlist.href,
          author: {
            connectOrCreate: {
              where: {
                identifier: playlist.owner.id,
              },
              create: {
                identifier: playlist.owner.id,
                name: playlist.owner.display_name,
                href: playlist.owner.href,
              },
            },
          },
        },
      });
    }

    for (const album of albums) {
      await prisma.album.upsert({
        where: {
          identifier: album.id,
        },
        update: {
          popularity: album.popularity,
          availableMarkets: album.available_markets,
          images: album.images.map((i) => i.url),
        },
        create: {
          identifier: album.id,
          name: album.name,
          images: album.images.map((i) => i.url),
          releaseDate: new Date(album.release_date),
          totalTracks: album.total_tracks,
          href: album.href,
          popularity: album.popularity,
          availableMarkets: album.available_markets,
          artists: {
            connectOrCreate: album.artists.map((artist) => ({
              where: {
                identifier: artist.id,
              },
              create: {
                identifier: artist.id,
                name: artist.name,
                href: artist.href,
              },
            })),
          },
          user: {
            connect: {
              identifier: data.identifier,
            },
          },
        },
      });
    }
    for (const artist of artists.artists.items) {
      await prisma.artist.upsert({
        where: {
          identifier: artist.id,
        },
        update: {
          name: artist.name,
          popularity: artist.popularity,
          href: artist.href,
          images: artist.images.map((i: any) => i.url),
          followers: artist.followers.total,
          genres: artist.genres,
        },
        create: {
          identifier: artist.id,
          name: artist.name,
          popularity: artist.popularity,
          href: artist.href,
          images: artist.images.map((i: any) => i.url),
          followers: artist.followers.total,
          genres: artist.genres,
        },
      });
    }

    return NextResponse.json({
      message: "User data synced",
      code: 201,
    });
  } catch (err) {
    return NextResponse.json({
      error: "Error upserting user",
      code: 500,
    });
  }
}
