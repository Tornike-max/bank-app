import { User } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export default function Footer() {
  const { user, isAuthenticated } = useAuth();
  return (
    <ul className="max-w-[2200px] w-full flex justify-between items-center px-4">
      <div>
        <Link
          className="hover:bg-primary-500  hover:text-stone-200 py-1 px-2 rounded-md duration-150 transition-all"
          to="/settings"
        >
          <li>Settings</li>
        </Link>
      </div>

      <div>
        {isAuthenticated && (
          <Link
            className="text-xs hover:bg-primary-500 hover:text-stone-200 py-1 px-2 rounded-md duration-150 transition-all"
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
      </div>
    </ul>
  );
}
