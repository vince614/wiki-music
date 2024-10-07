"use client";

import { Button, User, Card, CardHeader, Image } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import React from "react";
import { Input } from "@nextui-org/input";
import { SearchIcon } from "lucide-react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { useDebouncedCallback } from "use-debounce";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

import { searchSpotifySong } from "@/lib/spotify/api";
import { SearchResultInterface } from "@/types/interface";
import { formatDuration } from "@/lib/utils";

export default function SearchPage() {
  const [results, setResults] = React.useState<SearchResultInterface>({
    songs: [],
    albums: [],
    artists: [],
  });

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  React.useEffect(() => {
    if (searchParams.get("q")) {
      searchSong(searchParams.get("q") as string);
    }
  }, []);

  const handleSearch = useDebouncedCallback((query: string) => {
    const params = new URLSearchParams(searchParams);

    if (query) {
      params.set("q", query);
      searchSong(query).then((r) => r);
    } else {
      params.delete("q");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 500);

  const searchSong = async (query: string) => {
    const data = await searchSpotifySong(query, 8);

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

    setResults({
      songs: songs,
      albums: albums,
      artists: artists,
    });
  };

  return (
    <div className="w-full flex-1 p-4">
      <div className="flex items-center gap-x-3">
        <Button isIconOnly className="sm:hidden" size="sm" variant="flat">
          <Icon
            className="text-default-500"
            icon="solar:sidebar-minimalistic-linear"
            width={20}
          />
        </Button>
        <h1 className="text-3xl font-bold leading-9 text-default-foreground">
          Search
        </h1>
      </div>
      <h2 className="mt-2 text-small text-default-500">
        Search for your favorite songs, artists, and albums.
      </h2>
      <div className="container flex pt-5 flex-col">
        <Input
          classNames={{
            base: "max-w-full max-w-xl h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper:
              "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          defaultValue={searchParams.get("query") || ""}
          placeholder="Type to search a song, artist, or album"
          size="sm"
          startContent={<SearchIcon size={18} />}
          type="search"
          onChange={(e) => handleSearch(e.target.value)}
        />
        <div className="pt-5">
          {results.albums.length > 0 && (
            <div className="mt-3">
              <h3 className="text-xl font-bold">Albums</h3>
              <div className="flex gap-3 mt-8 flex-wrap justify-between m-2">
                {results.albums.map((album, index) => (
                  <Card
                    key={index}
                    className="col-span-12 sm:col-span-4 h-[300px]"
                  >
                    <CardHeader className="absolute z-10 bottom-1 flex-col !items-start">
                      <p className="text-tiny text-white/60 uppercase font-bold">
                        {album.release_date}
                      </p>
                      <h4 className="text-white font-medium text-large">
                        {album.name}
                      </h4>
                    </CardHeader>
                    <Image
                      removeWrapper
                      alt="Card background"
                      className="z-0 w-full h-full object-cover"
                      src={album.image}
                    />
                  </Card>
                ))}
              </div>
            </div>
          )}

          {results.artists.length > 0 && (
            <div className="mt-10">
              <h3 className="text-xl font-bold">Artists</h3>
              <div className="flex gap-3 mt-8 flex-wrap justify-between m-2">
                {results.artists.map((artist, index) => (
                  <User
                    key={index}
                    avatarProps={{
                      radius: "lg",
                      size: "lg",
                      src: artist.image,
                    }}
                    description="Artist"
                    name={artist.name}
                  >
                    test
                  </User>
                ))}
              </div>
            </div>
          )}

          {results.songs.length > 0 && (
            <div className="mt-10">
              <h3 className="text-xl font-bold">Songs</h3>
              <Table
                removeWrapper
                aria-label="Example static collection table"
                className="mt-8"
              >
                <TableHeader>
                  <TableColumn>Song</TableColumn>
                  <TableColumn>Artist</TableColumn>
                  <TableColumn>Album</TableColumn>
                  <TableColumn>Duration</TableColumn>
                </TableHeader>
                <TableBody>
                  {results.songs.map((song, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <User
                          avatarProps={{
                            radius: "lg",
                            src: song.image,
                          }}
                          name={song.name}
                        />
                      </TableCell>
                      <TableCell>{song.artist}</TableCell>
                      <TableCell>{song.album}</TableCell>
                      <TableCell>{song.duration}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
