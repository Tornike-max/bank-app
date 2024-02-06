import { Button, Input, Spinner } from "@nextui-org/react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { HiOutlineEye, HiOutlineEyeSlash } from "react-icons/hi2";
import { MdOutlineEmail } from "react-icons/md";

import { useRegister } from "../../hooks/authHooks/useRegister";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../../hooks/authHooks/useLogin";

type RegisterType = {
  username: string;
  email: string;
  password: string;
  repeatPass: string;
  name: string;
};

export default function Register() {
  const navigate = useNavigate();
  const { register, handleSubmit, getValues } = useForm<RegisterType>();
  const [isVisible, setIsVisible] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);
  const { register: registerUser, isRegistring } = useRegister();
  const { login } = useLogin();

  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleVisibility2 = () => setIsVisible2(!isVisible2);

  const onSubmit: SubmitHandler<RegisterType> = async (data) => {
    console.log(data);

    if (!data) return;

    const registerData = {
      email: data.email,
      password: data.password,
      name: data.name,
      username: data.username,
    };

    const signup = await registerUser(registerData);

    if (signup) {
      await login({ email: data.email, password: data.password });
    }
  };

  return (
    <div className="max-w-[2200px] w-full flex justify-center items-center">
      <div className="w-full hidden sm:flex justify-center items-center h-screen bg-primary-500">
        <img className="max-w-sm w-full px-4" src="/vite.svg" alt="logo" />
      </div>
      <div className="w-full  flex justify-center items-center h-screen">
        <form
          className="w-full px-4 flex justify-center items-center flex-col gap-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="w-full  flex justify-center items-center flex-col gap-2">
            <h1 className="text-xl sm:text-2xl lg:text-2xl  font-bold text-primary-500">
              Sign Up
            </h1>
            <span className="text-xs sm:text-md 2xl:text-lg  font-semibold text-primary-500">
              Enter your details below to create your account and get started.
            </span>
          </div>
          <div className="w-full flex justify-center items-center flex-col">
            <Input
              className="mb-4"
              variant="bordered"
              label="User Name"
              placeholder="Enter Your User Name"
              {...register("username", { required: "Username is required" })}
            />
            <Input
              className="mb-4"
              variant="bordered"
              label="Full Name"
              placeholder="Enter Your Full Name"
              {...register("name", { required: "Full Name is required" })}
            />
            <Input
              className="mb-4"
              label="Email"
              variant="bordered"
              type="email"
              placeholder="Enter your email"
              {...register("email", { required: "Email is required" })}
              startContent={
                <MdOutlineEmail className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
              }
              endContent={
                <div className="flex items-center">
                  <span className="text-stone-500">@example.com</span>
                </div>
              }
            />
            <Input
              className="mb-4"
              label="Password"
              variant="bordered"
              type={isVisible ? "text" : "password"}
              placeholder="Enter your password"
              {...register("password", { required: "Password is required" })}
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
                    <HiOutlineEyeSlash className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <HiOutlineEye className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
            />
            <Input
              className="mb-4"
              label="Repeat Password"
              variant="bordered"
              type={isVisible2 ? "text" : "password"}
              placeholder="Repeat your password"
              {...register("repeatPass", {
                required: "Repeat Password is required",
                validate: (value) =>
                  getValues().password === value || "Passwords should match",
              })}
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility2}
                >
                  {isVisible2 ? (
                    <HiOutlineEyeSlash className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <HiOutlineEye className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
            />
          </div>
          <div className="w-full flex justify-end items-center gap-2">
            <Button
              onClick={() => navigate(-1)}
              variant="ghost"
              color="default"
            >
              Go Back
            </Button>
            <Button disabled={isRegistring} color="primary" type="submit">
              {isRegistring ? (
                <Spinner size="sm" color="primary" />
              ) : (
                "Register"
              )}
            </Button>
          </div>
          <div className="w-full flex justify-center items-center gap-1 py-2 text-xs md:text-sm">
            <span>Alredy have an account?</span>
            <Link className="text-primary-500" to="/login">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
