import { title } from "@/components/primitives";
import Table from "@/components/search/Table";
import { Spacer } from "@nextui-org/react";

export default function SongPage() {
  return (
    <div className="w-full d-flex">
      <h1 className={title()}>Songs</h1>
      <Spacer y={5} />
      <Table />
    </div>
  );
}
