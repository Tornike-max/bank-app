import { useContext } from "react";
import { AuthContext } from "./AuthContext";

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined)
    throw new Error("You are using context outside of the authcontxt");

  return context;
}
