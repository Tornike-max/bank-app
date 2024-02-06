import { Button, Input, Spinner } from "@nextui-org/react";
import { useChangePhone } from "../../hooks/profile/useChangePhone";
import { useState } from "react";

export default function ChangeUserNumber({ userId }: { userId: string }) {
  const [phone, setPhone] = useState("");
  const { changePhoneNumber, isChanging } = useChangePhone();

  function handleChange() {
    if (!phone) return;
    changePhoneNumber({ userId, phone });
    setPhone("");
  }
  return (
    <div className="w-full flex justify-center items-center flex-col rounded-lg bg-stone-100 py-6 px-4">
      <h1 className="w-full text-start text-primary-500 font-semibold text-xl">
        Phone Number
      </h1>
      <div className="w-full flex justify-center items-center gap-2">
        <Input
          type="number"
          label="Phone"
          variant="bordered"
          color="primary"
          className="w-full"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <div className="w-full flex justify-end items-center py-2">
        <Button onClick={handleChange} variant="ghost" color="primary">
          {isChanging ? <Spinner /> : "Change"}
        </Button>
      </div>
    </div>
  );
}
