"use server";

import PlaylistsComponent from "@/components/dashboard/page/playlists";
import { auth } from "@/auth";
import { getUserPlaylists } from "@/lib/spotify/user";
import {getUserLibrary} from "@/lib/user/data";

export default async function LibraryPage() {
  const session = await auth();

  if (!session?.user) {
    return "<div>Unauthorized</div>";
  }
  const userPlaylists = await getUserPlaylists(session.accessToken);
  const userLibrary = await getUserLibrary(session.identifier);

  console.log(userLibrary);

  return (
    <div className="mt-4">
      <div className="flex items-center">
        <h1 className="text-2xl font-semibold mr-3">Playlists</h1>
        <span className="inline-block bg-blue-600 text-white text-xs font-semibold rounded-full px-2 py-1">
          {userPlaylists.length}
        </span>
      </div>

      <PlaylistsComponent playlists={userPlaylists} />
    </div>
  );
}
