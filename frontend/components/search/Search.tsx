"use client";

import { useDebouncedCallback } from "use-debounce";
import { Spinner } from "@nextui-org/react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Input } from "@nextui-org/input";
import React from "react";

import SongCard from "@/components/SongCard";
import { SearchIcon } from "@/components/icons/SearchIcon";
import { searchSong } from "@/lib/spotify/api";

export function SearchResult() {
  const searchParams = useSearchParams(); // Client side only
  const pathname = usePathname();
  const { replace } = useRouter();
  const { data: session } = useSession();

  const [songs, setSongs] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      if (searchParams?.has("q")) {
        const term = searchParams.get("q");

        if (term) {
          setLoading(true);
          const res = await searchSong(session?.accessToken, term);

          setSongs(res);
          setLoading(false);
        }
      }
    })();
  }, [searchParams]);

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set("q", term);
    } else {
      params.delete("q");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  console.log(songs);

  return (
    <>
      <div className="flex max-w-full container mb-5">
        <Input
          classNames={{
            base: "max-w-full h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper:
              "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          defaultValue={searchParams?.get("q")?.toString()}
          placeholder="Type to search a song..."
          size="sm"
          startContent={<SearchIcon size={18} />}
          type="search"
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
        />
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-96">
          <Spinner size="sm" />
        </div>
      ) : (
        <div className="md:container md:mx-auto grid grid-cols-1 md:grid-cols-2">
          {songs.map((song) => (
            <SongCard
              key={song.id}
              songAlbum={song.album.name}
              songArtist={song.artists[0].name}
              songCover={song.album.images[0].url}
              songDuration={song.duration_ms}
              songName={song.name}
              songPreviewUrl={song.preview_url}
            />
          ))}
        </div>
      )}
    </>
  );
}
