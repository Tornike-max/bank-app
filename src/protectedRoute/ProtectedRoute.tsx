import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { Spinner } from "@nextui-org/react";
import { useEffect } from "react";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigate = useNavigate();

  const { isAuthenticated, user, isLoading } = useAuth();
  const getSessionId = localStorage.getItem("cookieFallback");

  useEffect(() => {
    if (getSessionId?.includes("a_session_")) {
      navigate("/");
    }
  }, [getSessionId]);

  if (isLoading)
    return (
      <div className="flex justify-center items-center my-36">
        <Spinner size="lg" />
      </div>
    );

  if (!user && !isLoading && !getSessionId?.includes("a_session_")) {
    navigate("/login");
  }

  return (
    <>
      {isAuthenticated && getSessionId?.includes("a_session_") ? (
        children
      ) : (
        <Navigate to="login" />
      )}
    </>
  );
}
