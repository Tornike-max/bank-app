import { Button, Input, Spinner } from "@nextui-org/react";
import { useLogin } from "../../hooks/authHooks/useLogin";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineArrowLeft } from "react-icons/hi2";
import { useAuth } from "../../context/useAuth";
import toast from "react-hot-toast";

type LoginType = {
  email: string;
  password: string;
};

export default function Login() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<LoginType>();
  const { login, isUserLogin } = useLogin();
  const { checkAuthUser } = useAuth();

  const onSubmit: SubmitHandler<LoginType> = async (data) => {
    if (!data) return;

    const loginUser = await login(data);

    if (!loginUser) {
      toast.error("There is no user");
    }

    const isLoggedIn = await checkAuthUser();

    if (isLoggedIn) {
      navigate("/");
      toast.success("User Successfully logged in");
    }
  };

  return (
    <div className="max-w-[2200px] w-full flex justify-center items-center h-screen">
      <div className="w-full hidden  sm:flex justify-center items-center h-screen bg-primary-500">
        <img className="max-w-sm w-full px-4" src="/vite.svg" alt="logo" />
      </div>
      <div className=" w-full flex justify-center h-screen items-center flex-col gap-4 px-4">
        <div className="w-full flex justify-center items-center flex-col gap-2">
          <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-3xl font-bold text-primary-500">
            Welcome Back
          </h1>
          <span className="text-xs sm:text-md lg:text-lg  font-semibold text-primary-500">
            Enter your email and password to access your account
          </span>
        </div>

        <form
          className="max-w-lg w-full flex justify-center items-center gap-3 flex-col"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="w-full">
            <Input
              variant="bordered"
              color="primary"
              size="lg"
              label="Enter your email"
              className="w-full"
              {...register("email", {
                required: "This Field Is Required",
              })}
            />
          </div>
          <div className="w-full">
            <Input
              variant="bordered"
              size="lg"
              type="password"
              label="Enter your password"
              color="primary"
              className="w-full"
              {...register("password", {
                required: "This Field Is Required",
              })}
            />
          </div>

          <div className="w-full flex justify-end items-center py-2 gap-2">
            <Button
              onClick={() => navigate(-1)}
              type="button"
              variant="ghost"
              color="default"
              className="flex items-center gap-2"
            >
              <HiOutlineArrowLeft />
              <span>Go Back</span>
            </Button>
            <Button
              disabled={isUserLogin}
              type="submit"
              variant="ghost"
              color="primary"
            >
              {isUserLogin ? <Spinner size="sm" color="primary" /> : "Login"}
            </Button>
          </div>
          <div className="w-full flex justify-end items-center gap-1">
            <span className="text-xs md:text-sm">
              You Don't Have an Account?
            </span>
            <Link
              className="text-primary-500 hover:underline text-xs md:text-sm"
              to="/register"
            >
              Click here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
