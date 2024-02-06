import { Button, Input, Spinner } from "@nextui-org/react";
import { useChangeName } from "../../hooks/profile/useChangeName";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ChangeUserInfo({ userId }: { userId: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { mutate, isPending } = useChangeName();

  function handleChangeName() {
    if (name || email) {
      mutate({ name, email, userId });
      setName("");
      setEmail("");
    } else {
      toast.error("You cannot replace a name or email with a blank space");
    }
  }
  return (
    <form className="w-full flex justify-center items-center flex-col gap-2 bg-stone-100 py-6 rounded-lg  px-4">
      <Input
        variant="bordered"
        color="primary"
        label="User Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        variant="bordered"
        color="primary"
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <div className="w-full flex justify-end items-center gap-1">
        <Button
          onClick={() => handleChangeName()}
          variant="ghost"
          color="primary"
        >
          {isPending ? <Spinner /> : "Change"}
        </Button>
      </div>
    </form>
  );
}
