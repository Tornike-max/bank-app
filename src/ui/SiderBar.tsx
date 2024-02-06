import { Link, useLocation } from "react-router-dom";
import { useLogout } from "../hooks/authHooks/useLogout";
import { useAuth } from "../context/useAuth";
import { Spinner, User } from "@nextui-org/react";
import {
  HiOutlineArrowLeftOnRectangle,
  HiOutlineCog6Tooth,
  HiOutlineCurrencyDollar,
  HiOutlineHomeModern,
  HiOutlineStar,
  HiOutlineUserGroup,
} from "react-icons/hi2";

export default function SiderBar() {
  const { pathname } = useLocation();
  const { logout, isLoggingOut } = useLogout();
  const { isAuthenticated, user } = useAuth();

  return (
    <ul className="w-full flex justify-start gap-8 flex-col text-lg font-semibold text-primary-500">
      <Link to="/profile">
        <User
          name={user?.name}
          description={<Link to={"/profile"}>{user?.email}</Link>}
          avatarProps={{
            src: user?.imageUrl,
          }}
        />
      </Link>
      <div className="flex flex-col justify-start items-start text-xl gap-8">
        <Link
          to="/"
          className={`flex items-center gap-1 cursor-pointer hover:bg-primary-600 hover:text-slate-200 ${
            pathname === "/" ? "bg-primary-600 text-slate-200" : ""
          } py-2 px-3 duration-150 transition-all rounded-md`}
        >
          <HiOutlineHomeModern />
          <span>Home</span>
        </Link>
        <Link
          to="/transactions"
          className={`flex items-center gap-1 cursor-pointer hover:bg-primary-600 hover:text-slate-200 ${
            pathname === "/transactions" ? "bg-primary-600 text-slate-200" : ""
          } py-2 px-3 duration-150 transition-all rounded-md`}
        >
          <HiOutlineCurrencyDollar />
          <span>Transactions</span>
        </Link>
        <Link
          to="/goals"
          className={`flex items-center gap-1 cursor-pointer hover:bg-primary-600 hover:text-slate-200 ${
            pathname === "/goals" ? "bg-primary-600 text-slate-200" : ""
          } py-2 px-3 duration-150 transition-all rounded-md`}
        >
          <HiOutlineStar />
          <span>Your Goals</span>
        </Link>
        <Link
          to="/customers"
          className={`flex items-center gap-1 cursor-pointer hover:bg-primary-600 hover:text-slate-200 ${
            pathname === "/customers" ? "bg-primary-600 text-slate-200" : ""
          } py-2 px-3 duration-150 transition-all rounded-md`}
        >
          <HiOutlineUserGroup />
          <span>Customers</span>
        </Link>
        <Link
          to="/settings"
          className={`flex items-center gap-1 cursor-pointer hover:bg-primary-600 hover:text-slate-200 ${
            pathname === "/settings" ? "bg-primary-600 text-slate-200" : ""
          } py-2 px-3 duration-150 transition-all rounded-md`}
        >
          <HiOutlineCog6Tooth />
          <span>Settings</span>
        </Link>
        {isAuthenticated ? (
          <button
            onClick={() => logout(user?.id || "")}
            className={`flex items-center gap-1 cursor-pointer hover:bg-primary-600 hover:text-slate-200  py-2 px-3 duration-150 transition-all rounded-md`}
          >
            <HiOutlineArrowLeftOnRectangle />
            <span>{isLoggingOut ? <Spinner color="white" /> : "Log Out"}</span>
          </button>
        ) : (
          <Link
            to="/login"
            onClick={() => logout(user?.id || "")}
            className={`flex items-center gap-1 cursor-pointer hover:bg-primary-600 hover:text-slate-200 py-2 px-3 duration-150 transition-all rounded-md`}
          >
            <HiOutlineArrowLeftOnRectangle />
            <span>{isLoggingOut ? <Spinner color="white" /> : "Log In"}</span>
          </Link>
        )}
      </div>
    </ul>
  );
}
