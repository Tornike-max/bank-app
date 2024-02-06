import { Button, Input, Spinner } from "@nextui-org/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useChangePassword } from "../../hooks/authHooks/useChangePassword";
import { useState } from "react";
import { HiOutlineEye, HiOutlineEyeSlash } from "react-icons/hi2";
import { zodResolver } from "@hookform/resolvers/zod";
import { PasswordZodSchema } from "../../zod/zod";

type PasswordTypes = {
  password: string;
  repeatPass: string;
  oldPassword: string;
};

export default function ChangePassword() {
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [visible3, setVisible3] = useState(false);

  const { changePass, isPending } = useChangePassword();
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<PasswordTypes>({ resolver: zodResolver(PasswordZodSchema) });

  const onSubmit: SubmitHandler<PasswordTypes> = (data) => {
    console.log(data);
    changePass({ password: data.password, oldPassword: data.oldPassword });
    reset();
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex justify-center items-center flex-col gap-2 bg-stone-100 py-6 rounded-lg  px-4"
    >
      <Input
        variant="bordered"
        color="primary"
        type={visible ? "text" : "password"}
        label="Old Password"
        endContent={
          <div>
            <button onClick={() => setVisible((visible) => !visible)}>
              {visible ? <HiOutlineEye /> : <HiOutlineEyeSlash />}
            </button>
          </div>
        }
        errorMessage={errors.oldPassword?.message}
        {...register("oldPassword", {
          required: "This Field Is Required",
        })}
      />

      <Input
        variant="bordered"
        color="primary"
        type={visible2 ? "text" : "password"}
        endContent={
          <div>
            <button onClick={() => setVisible2((visible) => !visible)}>
              {visible2 ? <HiOutlineEye /> : <HiOutlineEyeSlash />}
            </button>
          </div>
        }
        label="New Password"
        errorMessage={errors.password?.message}
        {...register("password", {
          required: "This Field Is Required",
        })}
      />

      <Input
        variant="bordered"
        color="primary"
        label="Repeat Password"
        type={visible3 ? "text" : "password"}
        endContent={
          <div>
            <button onClick={() => setVisible3((visible) => !visible)}>
              {visible3 ? <HiOutlineEye /> : <HiOutlineEyeSlash />}
            </button>
          </div>
        }
        errorMessage={errors.repeatPass?.message}
        {...register("repeatPass", {
          required: "This Field Is Required",
          validate: (value) =>
            value === getValues().password || "Passwords Should Match",
        })}
      />

      <div className="w-full flex justify-end items-center">
        <Button type="submit" variant="ghost" color="primary">
          {isPending ? <Spinner /> : "Change"}
        </Button>
      </div>
    </form>
  );
}
