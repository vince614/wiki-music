import { title } from "@/components/primitives";
import SongTable from "@/components/search/SongTable";
import { Spacer } from "@nextui-org/react";

export default function SongPage() {
  return (
    <div className="w-full d-flex">
      <h1 className={title()}>Songs</h1>
      <Spacer y={5} />
      <SongTable />
    </div>
  );
}
