import { Input } from "@nextui-org/input";

import { searchSong } from "@/lib/spotify/api";
import { auth, signIn } from "@/auth";
import SongCard from "@/components/SongCard";
import { SearchIcon } from "@/components/icons/SearchIcon";

export default async function SearchPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const session = await auth();

  if (!session?.accessToken) {
    return await signIn("spotify");
  }

  if (searchParams?.search) {
    const songs = await searchSong(session.accessToken, searchParams.search);

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
            placeholder="Type to search a song..."
            size="sm"
            startContent={<SearchIcon size={18} />}
            type="search"
          />
        </div>
        <div className="md:container md:mx-auto grid grid-cols-1 md:grid-cols-2">
          {songs.map((song) => (
            <SongCard
              key={song.id}
              songAlbum={song.album.name}
              songArtist={song.artists[0].name}
              songCover={song.album.images[0].url}
              songDuration={song.duration_ms}
              songName={song.name}
            />
          ))}
        </div>
      </>
    );
  }

  return (
    <>
      <div className="container">
        <Input
          classNames={{
            base: "max-w-full h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper:
              "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Type to search..."
          size="sm"
          startContent={<SearchIcon size={18} />}
          type="search"
        />
      </div>
    </>
  );
}
