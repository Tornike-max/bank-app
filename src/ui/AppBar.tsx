import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {
  HiOutlineArchiveBox,
  HiOutlineArrowLeftOnRectangle,
  HiOutlineArrowRightOnRectangle,
  HiOutlineBars4,
  HiOutlineHomeModern,
  HiOutlineMoon,
  HiOutlineSun,
  HiOutlineTableCells,
  HiOutlineUserGroup,
} from "react-icons/hi2";

import { MdOutlineFormatListBulleted } from "react-icons/md";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { Switch } from "@nextui-org/react";
import { useAuth } from "../context/useAuth";
import { useLogout } from "../hooks/authHooks/useLogout";

type Anchor = "top" | "left" | "bottom" | "right";

export default function SwipeableTemporaryDrawer() {
  const { logout } = useLogout();

  const { isAuthenticated, user } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const getSession = localStorage.getItem("cookieFallback");

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
      bgcolor={`${"bg-primary-800 h-screen "}`}
    >
      <List
        className={`flex flex-col justify-start items-center gap-4 bg-stone-100 transition-all duration-150`}
      >
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText>
              <Switch
                className={`flex gap-2 items-center `}
                defaultSelected
                size="lg"
                color="primary"
                startContent={<HiOutlineSun />}
                endContent={<HiOutlineMoon />}
              >
                <span className={`${"text-primary-500"}`}>Light Mode</span>
              </Switch>
            </ListItemText>
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton>
            {getSession?.includes("a_session_") && (
              <ListItemText>
                {isAuthenticated ? (
                  <Link className="flex gap-2 items-center" to="/profile">
                    <img
                      src={user?.imageUrl}
                      className="h-12 w-12 rounded-full"
                    />

                    <div className="flex flex-col">
                      <p className="body-bold font-serif text-xs">
                        {user?.name}
                      </p>
                      <p
                        className={`${"text-stone-600"} font-serif text-[10px] xl:text-xs `}
                      >
                        {user?.email}
                      </p>
                    </div>
                  </Link>
                ) : (
                  ""
                )}
              </ListItemText>
            )}
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <HiOutlineHomeModern
                className={`text-2xl ${"text-primary-500"} ${
                  pathname === "/" && "text-primary-700 font-bold"
                }`}
              />
            </ListItemIcon>
            <ListItemText>
              <Link
                className={`text-xl ${"text-primary-500"} ${
                  pathname === "/" && "text-primary-700 font-bold"
                }`}
                to="/"
              >
                Home
              </Link>
            </ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <HiOutlineTableCells
                className={`text-2xl ${"text-primary-500"} ${
                  pathname === "/transactions" && "text-primary-700 font-bold"
                }`}
              />
            </ListItemIcon>
            <ListItemText>
              <Link
                className={`text-xl ${"text-primary-500"} ${
                  pathname === "/transactions" && "text-primary-700 font-bold"
                }`}
                to="/transactions"
              >
                Transactions
              </Link>
            </ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <MdOutlineFormatListBulleted
                className={`text-2xl ${"text-primary-500"} ${
                  pathname === "/goals" && "text-primary-700 font-bold"
                }`}
              />
            </ListItemIcon>
            <ListItemText>
              <Link
                className={`text-xl ${"text-primary-500"} ${
                  pathname === "/goals" && "text-primary-700 font-bold"
                }`}
                to="/goals"
              >
                Your Goals
              </Link>
            </ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
      <Divider className={`bg-stone-400  transition-all duration-150`} />
      <List
        className={`flex flex-col justify-start items-center gap-4 max-h-full bg-stone-100  transition-all duration-150`}
      >
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <HiOutlineUserGroup
                className={`text-2xl ${"text-primary-500"} ${
                  pathname === "/customers" && "text-primary-700 font-bold"
                }`}
              />
            </ListItemIcon>
            <ListItemText>
              <Link
                className={`text-xl ${"text-primary-500"} ${
                  pathname === "/customers" && "text-primary-700 font-bold"
                }`}
                to="/customers"
              >
                Customers
              </Link>
            </ListItemText>
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <HiOutlineArchiveBox
                className={`text-2xl ${"text-primary-500"} ${
                  pathname === "/about" && "text-primary-700 font-bold"
                }`}
              />
            </ListItemIcon>
            <ListItemText>
              <Link
                className={`text-xl ${"text-primary-500"} ${
                  pathname === "/about" && "text-primary-700 font-bold"
                }`}
                to="/about"
              >
                About Us
              </Link>
            </ListItemText>
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          {getSession?.includes("a_session_") ? (
            <ListItemButton
              onClick={() => logout(user?.id || "")}
              className={`text-2xl ${"text-primary-500"} ${
                pathname === "/" && "text-primary-700 font-bold"
              }`}
            >
              <ListItemIcon>
                <HiOutlineArrowLeftOnRectangle
                  className={`${"text-primary-500"} text-2xl`}
                />
              </ListItemIcon>
              <ListItemText>
                <span className={`${"text-primary-500"} text-xl`}>Log Out</span>
              </ListItemText>
            </ListItemButton>
          ) : (
            <ListItemButton
              onClick={() => navigate("/login")}
              className={`text-2xl ${"text-primary-500"} ${
                pathname === "/" && "text-primary-700 font-bold"
              }`}
            >
              <ListItemIcon>
                <HiOutlineArrowRightOnRectangle
                  className={`${"text-primary-500"} text-2xl`}
                />
              </ListItemIcon>
              <ListItemText>
                <span className={`${"text-primary-500"} text-xl`}>Log in</span>
              </ListItemText>
            </ListItemButton>
          )}
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div className="flex justify-start items-center w-full">
      <div className="">
        <Button onClick={toggleDrawer("left", true)}>
          <HiOutlineBars4
            className={`text-xl ${"text-primary-700"} ${
              pathname === "/" && " font-bold"
            }`}
          />
        </Button>
        <SwipeableDrawer
          anchor="left"
          open={state["left"]}
          onClose={toggleDrawer("left", false)}
          onOpen={toggleDrawer("left", true)}
        >
          {list("left")}
        </SwipeableDrawer>
      </div>
    </div>
  );
}
