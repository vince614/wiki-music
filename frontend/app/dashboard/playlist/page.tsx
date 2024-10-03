import { SimplifiedPlaylist } from "@spotify/web-api-ts-sdk/src/types";

import PlaylistsComponent from "@/components/dashboard/page/playlists";
import { auth } from "@/auth";
import { getUserPlaylists } from "@/lib/spotify/api";

export default async function PlaylistsPage() {
  const session = await auth();

  if (!session?.user) {
    return "<div>Unauthorized</div>";
  }
  const userPlaylists = await getUserPlaylists(session.accessToken);

  return (
    <div className="w-full max-w-2xl flex-1 p-4">
      {userPlaylists.map((playlist: SimplifiedPlaylist) => (
        <PlaylistsComponent key={playlist.id} playlist={playlist} />
      ))}
    </div>
  );
}
