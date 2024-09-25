import { Spacer } from "@nextui-org/react";

import { title } from "@/components/primitives";
import SongTable from "@/components/search/SongTable";

export default function SongPage() {
  return (
    <div className="w-full d-flex">
      <h1 className={title()}>Songs</h1>
      <Spacer y={5} />
      <SongTable />
    </div>
  );
}
