import { Link } from "react-router-dom";
import { User } from "@nextui-org/react";
import { useAuth } from "../context/useAuth";
import { useLogout } from "../hooks/authHooks/useLogout";
import DrawerAppBar from "./AppBar";

export default function Header() {
  const { user, isAuthenticated } = useAuth();
  const { logout, isLoggingOut } = useLogout();
  return (
    <ul className="max-w-[2200px] w-full flex justify-between items-center px-4 md:px-10 py-2 text-sm  xl:text-xl font-semibold text-primary-500 ">
      <DrawerAppBar />

      <div className="max-w-[100px] sm:max-w-xs w-full flex items-center justify-end gap-2">
        {isAuthenticated && (
          <Link
            className="text-xs hidden sm:block hover:bg-primary-500 hover:text-stone-200 py-1 px-2 rounded-md duration-150 transition-all"
            to="/profile"
          >
            <User
              name={user?.name}
              description={<Link to="/profile">@{user?.username}</Link>}
              avatarProps={{
                src: user?.imageUrl,
              }}
            />
          </Link>
        )}

        <li className="hover:bg-primary-500 hover:text-stone-200 py-1 px-3 rounded-md duration-150 transition-all text-sm">
          <button
            disabled={isLoggingOut}
            onClick={() => logout(user?.id || "")}
            className="flex items-center gap-2"
          >
            <span>Log Out</span>
          </button>
        </li>
      </div>
    </ul>
  );
}
