"use client";

import { Button, User, Card, CardHeader, Image } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import React, { Suspense } from "react";
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

import { searchSpotify } from "@/lib/spotify/api";
import { SearchResultInterface } from "@/types/interface";
import SongsSkeleton from "@/app/dashboard/search/loading";

export default function SearchPage() {
  const [results, setResults] = React.useState<SearchResultInterface>({
    songs: [],
    albums: [],
    artists: [],
  });
  const [loading, setLoading] = React.useState(false);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  React.useEffect(() => {
    if (searchParams.get("q")) {
      searchSpotifyResult(searchParams.get("q") as string);
    }
  }, []);

  const handleSearch = useDebouncedCallback((query: string) => {
    const params = new URLSearchParams(searchParams);

    if (query) {
      params.set("q", query);
      searchSpotifyResult(query).then((r) => r);
    } else {
      params.delete("q");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 500);

  const searchSpotifyResult = async (query: string) => {
    const result = await searchSpotify(query, 12);

    setResults(result);
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
              <div className="flex gap-3 mt-8 flex-wrap justify-start m-2">
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
              <div className="flex gap-3 mt-8 flex-wrap justify-start col-end-4 m-2">
                {results.artists.map((artist, index) => (
                  <div key={index} className="w-1/6">
                    <User
                      avatarProps={{
                        radius: "lg",
                        size: "lg",
                        src: artist.image,
                      }}
                      description="Artist"
                      name={artist.name}
                    >
                      {artist.name}
                    </User>
                  </div>
                ))}
              </div>
            </div>
          )}
          <Suspense fallback={<SongsSkeleton />}>
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
          </Suspense>
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
