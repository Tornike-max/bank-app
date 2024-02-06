import { Spinner } from "@nextui-org/react";

export default function Loader() {
  return (
    <div className="flex justify-center items-center py-36">
      <Spinner color="primary" />
    </div>
  );
}
