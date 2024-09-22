import { title } from "@/components/primitives";
import Table from "@/components/search/Table";

export default function SongPage() {
  return (
    <div>
      <h1 className={title()}>Songs</h1>
      <Table />
    </div>
  );
}
